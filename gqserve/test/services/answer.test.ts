import assert from 'assert';
import app from '../../src/app';
import { createUser } from './helpers';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

describe('\'answer\' service', () => {
  it('registered the service', () => {
    const service = app.service('answer');

    assert.ok(service, 'Registered the service');
  });

  it('can create an answer', async () => {
    const service = app.service('answer');
    const user = await createUser(app);
    const gameroundservice = app.service('gameround');
    const params = { user };
    const gameround = await gameroundservice.create({}, params);
    const gameroundData = await gameroundservice.get(gameround.id, params);
    const q1 = gameroundData.questions[0];

    const r = await service.create({ id: q1.id, answer: 'A' }, params);

    expect(r.answer).to.equal('A');
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
});
