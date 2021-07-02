import assert from 'assert';
import app from '../../src/app';
import { createUser } from './helpers';
import { expect } from 'chai';
import Knex from 'knex';

describe('\'answer\' service', () => {
  it('registered the service', () => {
    const service = app.service('answer');

    assert.ok(service, 'Registered the service');
  });

  it('can create an answer', async () => {
    const db: Knex = app.get('knexClient');
    const service = app.service('answer');
    const user = await createUser(app);
    const gameroundservice = app.service('gameround');
    const params = { user };
    const gameround = await gameroundservice.create({}, params);
    const gameroundData = await gameroundservice.get(gameround.id, params);
    const q1 = gameroundData.questions[0];

    const r = await service.create({ id: q1.id, answer: 'A' }, params);

    expect(r.answer).to.equal('A');
    const dbitem = await db.table('gamequestions').first(['answer']).where('id', q1.id) as any;
    expect(JSON.parse(dbitem.answer)).to.eql({ a: 'A' });
  });

  it('cannot create an answer for another user\'s game', async () => {
    const service = app.service('answer');
    const user1 = await createUser(app);
    const gameroundservice = app.service('gameround');
    const params1 = { user: user1 };
    const gameround = await gameroundservice.create({}, params1);
    const gameroundData = await gameroundservice.get(gameround.id, params1);
    const q1 = gameroundData.questions[0];
    const user2 = await createUser(app);
    const params2 = { user: user2 };

    const r = await service.create({ id: q1.id, answer: 'A' }, params2) as any;

    expect(r.code).to.eq(404);
  });

  it('cannot create an answer for a closed game', async () => {
    const service = app.service('answer');
    const user = await createUser(app);
    const gameroundservice = app.service('gameround');
    const params = { user };
    const gameround = await gameroundservice.create({}, params);
    const gameroundData = await gameroundservice.get(gameround.id, params);
    const q1 = gameroundData.questions[0];
    await gameroundservice.patch(gameround.id, { action: 'close' }, params);

    const r = await service.create({ id: q1.id, answer: 'A' }, params) as any;

    expect(r.code).to.eq(400);
  });
});
