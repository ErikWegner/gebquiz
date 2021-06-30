import { Params } from '@feathersjs/feathers';
import Knex from 'knex';
import { Application } from '../../declarations';
import { GameData } from '../game/game.class';
import { QuestionData } from '../question/question.class';

export interface GameRoundData {
  id: number;
  questions?: QuestionData[];
}

interface ServiceOptions { }

interface GameQuestionRelation {
  id?: number;
  game_id: number;
  question_id: number;
}

function shuffle(items: QuestionData[]): QuestionData[] {
  let counter = items.length;
  const r: QuestionData[] = items.concat();
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = r[counter];
    r[counter] = r[index];
    r[index] = temp;
  }

  return r;
}

export class Gameround {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get(id: number, params?: Params): Promise<GameRoundData> {
    return { id };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(_data: unknown, params?: Params): Promise<GameRoundData> {
    const gameservice = this.app.service('game');
    const newround = await gameservice.create({ user_id: params?.user?.id }) as GameData;
    const questions = await this.app.service('question').find({ paginate: false }) as QuestionData[];
    const shuffledQuestions = shuffle(questions);
    const batchInsertRows = shuffledQuestions.map(q => ({ game_id: newround.id, question_id: q.id } as GameQuestionRelation));
    const db: Knex = this.app.get('knexClient');
    await db.batchInsert('gamequestions', batchInsertRows);

    return { id: newround.id || 0 };
  }

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // async update (id: NullableId, data: Data, params?: Params): Promise<Data> {
  //   return data;
  // }

}
