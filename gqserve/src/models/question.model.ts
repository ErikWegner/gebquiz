// question-model.ts - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
import Knex from 'knex';
import { Application } from '../declarations';

export default function (app: Application): Knex {
  const db: Knex = app.get('knexClient');
  const tableName = 'question';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      console.error(`Error: table ${tableName} missing`);
    }
  });


  return db;
}
