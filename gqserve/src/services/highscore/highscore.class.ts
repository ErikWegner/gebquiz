import { Params } from '@feathersjs/feathers';
import Knex from 'knex';
import { Application } from '../../declarations';

interface HighscoreData {

}

interface ServiceOptions { }

export class Highscore {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async find(params?: Params): Promise<HighscoreData[]> {
    const db: Knex = this.app.get('knexClient');

    return await (
      db('games')
        .select({
          name: 'users.name',
          score: 'games.score',
        })
        .orderBy('score', 'desc')
        .limit(10)
        .whereNotNull('games.end')
        .leftJoin('users', 'users.id', 'games.user_id')
    );
  }
}
