import { Action, createReducer, on } from '@ngrx/store';
import { answerClicked, questionLoaded } from '../actions/quiz.action';
import { QuizState } from '../state/quiz.state';

export const initialState: QuizState = {
  gameid: 0,
  questionid: 0,
  answerSaving: false,
};

const quizReducer = createReducer(
  initialState,
  on(questionLoaded, (state, question) => ({
    gameid: question.gameid,
    questionid: question.questionId,
    answerSaving: false,
  })),
  on(answerClicked, (state, clickData) => ({
    ...state,
    answerSaving: true,
  })),
);

export function reducer(state: QuizState | undefined, action: Action) {
  return quizReducer(state, action);
}
