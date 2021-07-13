import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { questionLoaded } from '../state/quiz.action';
import { AnswerKind } from '../answer-kind';
import { AppState } from '../state/app.state';
import { FeathersBridgeService } from './feathers-bridge.service';

interface CreateGameData {
  id: number;
}

interface Question {
  id: number;
  description: string;
  kind: AnswerKind;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  answer?: string;
}

interface GameRoundData {
  questions?: Question[];
}

export interface SelectedAnswers {
  A: boolean;
  B: boolean;
  C: boolean;
  D: boolean;
}


export interface QuestionData {
  meta: {
    nextQuestionNumber: number;
    prevQuestionNumber: number;
  }
  description: string;
  answerId: number;
  answerData?: {
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    kind: AnswerKind;
    selectedAnswers: SelectedAnswers;
  }
}

export const emtpySelectedAnswers = (): SelectedAnswers => ({ A: false, B: false, C: false, D: false });

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private lastScore = new ReplaySubject<number>(1);
  public readonly lastScore$ = this.lastScore.asObservable();

  constructor(
    private fbs: FeathersBridgeService,
    private store: Store<AppState>,
  ) { }

  public finalize(gameid: number): Observable<{ score: number }> {
    return from(this.fbs.gameroundService.patch(gameid, { action: 'close' })).pipe(
      tap(h => this.lastScore.next(h.score)),
    );
  }

  public startGame(): Observable<{ gameid: number }> {
    return new Observable(observer => {
      this.fbs.gameroundService
        .create({})
        .then((d: CreateGameData) => observer.next({ gameid: d.id }))
        .catch(reason => observer.error(reason))
        .finally(() => observer.complete());
    });
  }

  public getQuestion(gameid: number, question: number): Observable<QuestionData> {
    return from(this.fbs.gameroundService.get(gameid))
      .pipe(
        map((grd: GameRoundData): QuestionData => {
          const len = grd.questions?.length || 0;
          if (!grd.questions || len === 0) {
            return {
              meta: { nextQuestionNumber: 0, prevQuestionNumber: 0 },
              description: 'ERROR: Empty game',
              answerId: 0,
            };
          }
          const questionData = grd.questions[question < len ? question : 0];
          const nextQuestionNumber = (question + 1) % len;
          const prevQuestionNumber = (question + len - 1) % len;

          const selectedAnswers = emtpySelectedAnswers();
          const serverSelectedAnswers = JSON.parse(questionData.answer || '{}').a || '';
          'ABCD'.split('').forEach(c => {
            (selectedAnswers as any)[c] = serverSelectedAnswers.indexOf(c) > -1;
          });

          return {
            description: questionData.description,
            answerId: questionData.id,
            meta: {
              nextQuestionNumber, prevQuestionNumber,
            },
            answerData: {
              answerA: questionData.answerA,
              answerB: questionData.answerB,
              answerC: questionData.answerC,
              answerD: questionData.answerD,
              kind: questionData.kind,
              selectedAnswers,
            }
          }
        }),
        tap(d => {
          this.store.dispatch(questionLoaded({
            gameid,
            questionId: d.answerId,
            kind: d.answerData?.kind,
            selectedAnswers: d.answerData?.selectedAnswers || emtpySelectedAnswers(),
          }))
        }),
    )
  }

  public saveAnswer(questionId: number, selectedAnswers: SelectedAnswers): Observable<void> {
    const answer = Object.entries(selectedAnswers).filter((e) => e[1]).map(e => e[0]).join('');
    return from(this.fbs.answerService.create({ id: questionId, answer }));
  }

  getHighscores(): Observable<{ name: string, score: string }[]> {
    return from(this.fbs.highscoreService.find());
  }
}
