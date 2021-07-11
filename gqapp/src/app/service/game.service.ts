import { Injectable } from '@angular/core';
import { EMPTY, from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnswerKind } from '../answer-kind';
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
}

interface GameRoundData {
  questions?: Question[];
}

export interface QuestionData {
  meta: {
    nextQuestionNumber: number;
    prevQuestionNumber: number;
  }
  description: string;
  answerData?: {
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    kind: AnswerKind;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private fbs: FeathersBridgeService) { }

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
            return { meta: { nextQuestionNumber: 0, prevQuestionNumber: 0 }, description: 'ERROR: Empty game' };
          }
          const questionData = grd.questions[question < len ? question : 0];
          const nextQuestionNumber = (question + 1) % len;
          const prevQuestionNumber = (question + len - 1) % len;

          return {
            description: questionData.description,
            meta: {
              nextQuestionNumber, prevQuestionNumber,
            },
            answerData: {
              answerA: questionData.answerA,
              answerB: questionData.answerB,
              answerC: questionData.answerC,
              answerD: questionData.answerD,
              kind: questionData.kind,
            }
          }
        }),
      )

  }
}
