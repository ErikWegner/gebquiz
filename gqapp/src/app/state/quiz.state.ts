import { AnswerKind } from "../answer-kind";
import { SelectedAnswers } from "../service/game.service";

export interface QuizState {
  gameid: number;
  questionid: number;
  kind?: AnswerKind | undefined;
  answerSaving: boolean;
  answerToBeSaved: string;
  activeButtons: SelectedAnswers;
};
