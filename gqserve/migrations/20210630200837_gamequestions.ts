import * as Knex from 'knex';

import { tableName as questionTableName } from './20210629222251_questions';
import { tableName as gameTableName } from './20210630193009_games';

export const tableName = 'gamequestions';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments('id');
      table.integer('game_id').unsigned().notNullable().comment('Game');
      table.foreign('game_id').references('id').inTable(gameTableName).onDelete('RESTRICT');
      table.integer('question_id').unsigned().notNullable().comment('Question');
      table.foreign('question_id').references('id').inTable(questionTableName).onDelete('RESTRICT');
      table.json('answer').defaultTo('{}');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable(tableName);
}
