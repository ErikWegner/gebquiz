import { createAction, props } from '@ngrx/store';
import { AnswerKind } from '../answer-kind';
import { SelectedAnswers } from '../service/game.service';

export const questionLoaded = createAction(
  '[Quiz] question loaded',
  props<{
    gameid: number,
    questionId: number,
    kind: AnswerKind | undefined,
    selectedAnswers: SelectedAnswers,
  }>()
);

export const answerClicked = createAction(
  '[Quiz] answer clicked',
  props<{ answer: 'A' | 'B' | 'C' | 'D' }>()
);

export const answerSaving = createAction(
  '[Quiz] answer saving'
);

export const savingCompleted = createAction(
  '[Quiz] saving completed',
  props<{ selectedAnswers: SelectedAnswers }>()
);
