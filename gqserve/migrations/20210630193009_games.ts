import * as Knex from 'knex';

export const tableName = 'games';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().notNullable().comment('Initiator');
      table.foreign('user_id').references('id').inTable('users').onDelete('RESTRICT');
      table.dateTime('start').defaultTo(knex.fn.now());
      table.dateTime('end').nullable();
      table.integer('score').defaultTo(0);
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable(tableName);
}
