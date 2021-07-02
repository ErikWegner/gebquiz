import * as Knex from 'knex';

export const tableName = 'questions';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments('id');
      table.string('uuid').unique();
      table.text('description');
      table.string('answerA');
      table.string('answerB');
      table.string('answerC');
      table.string('answerD');
      table.integer('pointsA');
      table.integer('pointsB');
      table.integer('pointsC');
      table.integer('pointsD');
      table.integer('kind').comment('A: A or B, c:single choice, m:multiple choice');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable(tableName);
}

