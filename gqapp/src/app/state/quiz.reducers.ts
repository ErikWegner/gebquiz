import { Action, createReducer, on } from '@ngrx/store';
import { emtpySelectedAnswers } from '../service/game.service';
import { answerClicked, questionLoaded, savingCompleted } from './quiz.action';
import { selectedAnswers } from './quiz.selector';
import { QuizState } from './quiz.state';

export const initialState: QuizState = {
  gameid: 0,
  questionid: 0,
  answerSaving: false,
  answerToBeSaved: '',
  activeButtons: emtpySelectedAnswers(),
};

const quizReducer = createReducer(
  initialState,
  on(questionLoaded, (state, question) => ({
    ...state,
    gameid: question.gameid,
    questionid: question.questionId,
    kind: question.kind,
    answerSaving: false,
    activeButtons: question.selectedAnswers,
  })),
  on(answerClicked, (state, clickData) => ({
    ...state,
    //answerToBeSaved: clickData.answer
  })),
  on(savingCompleted, (state, props) => ({
    ...state,
    activeButtons: {
      ...props.selectedAnswers
    }
  } as QuizState)),
);

export function reducer(state: QuizState | undefined, action: Action) {
  return quizReducer(state, action);
}
