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

export const selectedAnswers = createSelector(
  (state: AppState) => state.quiz,
  (quiz) => quiz.activeButtons
);

export const questionId = createSelector(
  (state: AppState) => state.quiz,
  (quiz) => quiz.questionid
);

export const quiz = createSelector(
  (state: AppState) => state.quiz,
  (quiz) => quiz
);
