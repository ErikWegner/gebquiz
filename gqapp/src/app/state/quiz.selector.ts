import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { QuizState } from './quiz.state';

export const answerSaving = createSelector(
  (state: AppState) => state.quiz,
  (quiz: QuizState) => quiz.answerSaving
);

export const answerToBeSaved = createSelector(
  (state: AppState) => state.quiz,
  (quiz: QuizState) => quiz.answerToBeSaved
);
