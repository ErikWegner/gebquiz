import { Action, createReducer, on } from '@ngrx/store';
import * as QuizActions from '../actions/quiz.action';

export interface QuizState {
  quiz: {
    gameid: number;
    questionid: number;
  }
};

export const initialState: QuizState = {
  quiz: {
    gameid: 0,
    questionid: 0,
  },
};

const quizReducer = createReducer(
  initialState,
  on(QuizActions.questionLoaded, (state, question) => ({ ...state, quiz: { gameid: question.gameid, questionid: question.questionId } })),
);

export function reducer(state: QuizState | undefined, action: Action) {
  return quizReducer(state, action);
}
