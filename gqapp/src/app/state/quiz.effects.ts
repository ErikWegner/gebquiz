import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import { of } from 'rxjs';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { answerClicked, answerSaving } from './quiz.action';
import { answerToBeSaved } from './quiz.selector';

@Injectable()
export class QuizEffects {
  calcNewAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(answerClicked),
      map(v => {
        this.calcNewAnswer(v);
        return answerSaving({ answer: 'todo' });
      })
    )
  );

  constructor(
    private actions$: Actions,
  ) { }

  calcNewAnswer(z: {
    answer: "A" | "B" | "C" | "D";
  } & TypedAction<"[Quiz] answer clicked">): void {
    console.log(z);
  }
}
