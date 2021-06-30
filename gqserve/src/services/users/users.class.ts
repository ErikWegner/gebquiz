import { Service, KnexServiceOptions } from 'feathers-knex';
import { Application } from '../../declarations';

export interface UserData {
  id?: number;
  name: string;
}

export class Users extends Service<UserData> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<KnexServiceOptions>, app: Application) {
    super({
      ...options,
      name: 'users'
    });
  }
}
