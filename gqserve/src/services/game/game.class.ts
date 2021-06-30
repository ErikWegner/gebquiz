import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';

export interface GameData {
  id?: number;
  user_id: number;
  start?: Date;
  end?: Date;
  score?: number;
}

export class Game extends Service<GameData> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'games'
    });
  }
}
