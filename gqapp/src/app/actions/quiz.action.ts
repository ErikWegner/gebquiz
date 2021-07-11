import { createAction, props } from '@ngrx/store';

export const questionLoaded = createAction(
  '[Quiz] question loaded',
  props<{ gameid: number, questionId: number }>()
);

export const answerSelected = createAction(
  '[Quiz] answer clicked',
  props<{ answer: 'A' | 'B' | 'C' | 'D' }>()
);

export const answerSaving = createAction(
  '[Quiz] answer saving',
  props<{ answer: string }>()
);
