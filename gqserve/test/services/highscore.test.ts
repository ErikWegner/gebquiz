import assert from 'assert';
import { expect } from 'chai';
import Knex from 'knex';
import app from '../../src/app';
import { createUser } from './helpers';

describe('\'highscore\' service', () => {
  it('registered the service', () => {
    const service = app.service('highscore');

    assert.ok(service, 'Registered the service');
  });

  it('returns the highscore list', async () => {
    const db: Knex = app.get('knexClient');
    await db('games').delete();
    const user1 = await createUser(app, { name: 'cat' });
    const user2 = await createUser(app, { name: 'dog' });
    const user3 = await createUser(app, { name: 'horse' });
    const service = app.service('gameround');
    const gameround1 = await service.create({}, { user: user1 });
    const gameround2 = await service.create({}, { user: user2 });
    const gameround3 = await service.create({}, { user: user3 });
    await service.create({}, { user: user1 });
    await service.patch(gameround1.id, { action: 'close' }, { user: user1 });
    await service.patch(gameround2.id, { action: 'close' }, { user: user2 });
    await service.patch(gameround3.id, { action: 'close' }, { user: user3 });

    await db('games').where('id', gameround1.id).update({ score: 30 });
    await db('games').where('id', gameround2.id).update({ score: 60 });
    await db('games').where('id', gameround3.id).update({ score: 40 });

    const highscores = await app.service('highscore').find();

    expect(highscores).to.be.an('array').lengthOf(3);
    expect(highscores[0]).to.eql({ name: 'dog', score: 60 });
  });
});
