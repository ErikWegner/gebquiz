import { AnswerKind } from "../answer-kind";

export interface QuizState {
  gameid: number;
  questionid: number;
  kind?: AnswerKind | undefined;
  answerSaving: boolean;
  answerToBeSaved: string;
  activeButtons: number[];
};
