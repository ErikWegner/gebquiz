import * as Knex from 'knex';

export const tableName = 'users';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable(tableName, (table) => {
      table.increments('id');
      table.string('name');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable(tableName);
}

