import { Action, createReducer, on } from '@ngrx/store';
import { answerClicked, questionLoaded } from './quiz.action';
import { QuizState } from './quiz.state';

export const initialState: QuizState = {
  gameid: 0,
  questionid: 0,
  answerSaving: false,
  answerToBeSaved: '',
  activeButtons: [0, 0, 0, 0],
};

const quizReducer = createReducer(
  initialState,
  on(questionLoaded, (state, question) => ({
    ...state,
    gameid: question.gameid,
    questionid: question.questionId,
    kind: question.kind,
    answerSaving: false,
  })),
  on(answerClicked, (state, clickData) => ({
    ...state,
    //answerToBeSaved: clickData.answer
  })),
);

export function reducer(state: QuizState | undefined, action: Action) {
  return quizReducer(state, action);
}
