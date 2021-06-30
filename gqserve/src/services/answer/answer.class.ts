import { Params } from '@feathersjs/feathers';
import Knex from 'knex';
import { Application } from '../../declarations';

export interface AnswerData {
  id: number;
  answer: string;
}

interface ServiceOptions { }

export class Answer {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: AnswerData, params?: Params): Promise<AnswerData> {
    const db: Knex = this.app.get('knexClient');
    await db('gamequestions').where({ id: data.id }).update({ answer: JSON.stringify({ a: data.answer }) });

    return data;
  }
}
