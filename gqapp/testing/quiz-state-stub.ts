import { emtpySelectedAnswers } from "src/app/service/game.service";
import { QuizState } from "src/app/state/quiz.state";

export const quizStateStub = (): QuizState => {
  return {
    gameid: 0,
    questionid: 0,
    answerSaving: false,
    answerToBeSaved: '',
    activeButtons: emtpySelectedAnswers(),
  }
}
