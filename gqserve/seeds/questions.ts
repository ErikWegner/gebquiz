import * as Knex from 'knex';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { v4 as uuidv4 } from 'uuid';
import { tableName as questionTableName } from '../migrations/20210629222251_questions';

const tableName = questionTableName;

interface YamlQuestion {
  uuid?: string;
}

export async function seed(db: Knex): Promise<void> {

  const qdir = path.join('src', 'questions');
  const files = await fs.promises.readdir(qdir);

  await files.reduce(async (p, file) => {
    await p;

    if (!file.endsWith('.yaml')) {
      return;
    }

    console.log(file);
    const data = await fs.promises.readFile(path.join(qdir, file), 'utf8');
    const doc = yaml.load(data) as YamlQuestion;
    if (!doc.uuid) {
      doc.uuid = uuidv4();
    }
    await db(tableName).where('uuid', doc.uuid).delete();
    await db(tableName).insert(doc);
    return;
  }, Promise.resolve());
}
