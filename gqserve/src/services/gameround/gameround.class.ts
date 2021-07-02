import { BadRequest } from '@feathersjs/errors';
import { Params } from '@feathersjs/feathers';
import Knex from 'knex';
import { Application } from '../../declarations';
import { Game, GameData } from '../game/game.class';
import { QuestionData } from '../question/question.class';

export interface GameRoundPatchData {
  action: string;
}

export interface GameRoundData {
  id: number;
  questions?: QuestionData[];
  score?: any;
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

interface ReviewItem {
  pointsA: number;
  pointsB: number;
  pointsC: number;
  pointsD: number;
  answer: string;
  kind: string;
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
    const gameservice = this.app.service('game');
    const r: GameRoundData = { id };
    const game = await gameservice.get(id);
    if (game.end) {
      r.score = game.score;
    }

    return r;
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async patch(id: number, data: GameRoundPatchData, params?: Params): Promise<GameRoundData> {
    if (data.action === 'close') {
      const gameservice = this.app.service('game');
      const game = await gameservice.get(id);
      if (game.end) {
        throw new BadRequest('Invalid action');
      }

      game.end = new Date();
      await gameservice.update(id, game);
      const score = await this.calculateScore({ game, gameservice });
      game.score = score;
      await gameservice.update(id, game);
      return { id, score };
    }

    throw new BadRequest('Invalid action');
  }

  private async calculateScore(d: { game: GameData; gameservice: Game }): Promise<number> {
    const db: Knex = this.app.get('knexClient');
    const answers = await db
      .table('questions')
      .select({
        pointsA: 'questions.pointsA',
        pointsB: 'questions.pointsB',
        pointsC: 'questions.pointsC',
        pointsD: 'questions.pointsD',
        answer: 'gamequestions.answer',
        kind: 'questions.kind',
      })
      .leftJoin('gamequestions', 'questions.id', 'gamequestions.question_id')
      .leftJoin('games', 'games.id', 'gamequestions.game_id')
      .where('games.id', d.game.id);
    return answers.map((reviewItem: ReviewItem) => {
      const answerJ: { a: string } = JSON.parse(reviewItem.answer);
      switch (reviewItem.kind) {
        case 'A':
          if (answerJ.a === 'A') {
            return reviewItem.pointsA;
          }
          if (answerJ.a === 'B') {
            return reviewItem.pointsB;
          }
          return 0;
        case 'c':
          switch (answerJ.a) {
            case 'A':
              return reviewItem.pointsA;
            case 'B':
              return reviewItem.pointsB;
            case 'C':
              return reviewItem.pointsC;
            case 'D':
              return reviewItem.pointsD;
            default:
              return 0;
          }
        case 'm':
          let score = 0;
          const a = answerJ.a ?? '';
          if (a.indexOf('A') > -1) {
            score += reviewItem.pointsA;
          }
          if (a.indexOf('B') > -1) {
            score += reviewItem.pointsB;
          }
          if (a.indexOf('C') > -1) {
            score += reviewItem.pointsC;
          }
          if (a.indexOf('D') > -1) {
            score += reviewItem.pointsD;
          }
          return score;
      }
    }).reduce((p: number | undefined, c: number | undefined): number => (p ?? 0) + (c ?? 0), 0) ?? 0;
  }

}
