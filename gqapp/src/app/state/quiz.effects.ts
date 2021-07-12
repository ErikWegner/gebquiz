import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { of } from 'rxjs';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { emtpySelectedAnswers, GameService, SelectedAnswers } from '../service/game.service';
import { AppState } from './app.state';
import { answerClicked, answerSaving, savingCompleted } from './quiz.action';
import { answerToBeSaved, questionId, quiz, selectedAnswers } from './quiz.selector';
import { QuizState } from './quiz.state';

@Injectable()
export class QuizEffects {
  calcNewAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(answerClicked),
      concatLatestFrom(_action => this.store.select(quiz)),
      tap(([action, quiz]) => {
        const selectedAnswers = this.computeSelectedAnswers(action, quiz);
        this.store.dispatch(answerSaving());
        this.g.saveAnswer(quiz.questionid, selectedAnswers).subscribe(
          () => {
            this.store.dispatch(savingCompleted({ selectedAnswers }));
          },
          (e) => {
            console.error(e);
            this.store.dispatch(savingCompleted({ selectedAnswers: quiz.activeButtons }));
          },
        );
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private g: GameService,
  ) { }

  private computeSelectedAnswers(action: { answer: "A" | "B" | "C" | "D"; }, quiz: QuizState): SelectedAnswers {
    if (quiz.kind === 'm') {
      const m = { ...quiz.activeButtons };
      m[action.answer] = !m[action.answer];
      return m;
    }

    const e = emtpySelectedAnswers();
    e[action.answer] = true;
    return e;
  }

}
