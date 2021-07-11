import { createAction, props } from '@ngrx/store';
import { AnswerKind } from '../answer-kind';

export const questionLoaded = createAction(
  '[Quiz] question loaded',
  props<{
    gameid: number,
    questionId: number,
    kind: AnswerKind | undefined,
  }>()
);

export const answerClicked = createAction(
  '[Quiz] answer clicked',
  props<{ answer: 'A' | 'B' | 'C' | 'D' }>()
);

export const answerSaving = createAction(
  '[Quiz] answer saving',
  props<{ answer: string }>()
);
