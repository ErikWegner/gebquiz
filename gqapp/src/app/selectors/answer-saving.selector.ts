import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { QuizState } from '../state/quiz.state';

export const answerSaving = createSelector(
  (state: AppState) => state.quiz,
  (quiz: QuizState) => quiz.answerSaving
);
