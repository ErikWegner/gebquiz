import { Application } from '../declarations';
import users from './users/users.service';
import game from './game/game.service';
import question from './question/question.service';
import gameround from './gameround/gameround.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(game);
  app.configure(question);
  app.configure(gameround);
}
