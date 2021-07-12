import assert from 'assert';
import app from '../../src/app';
import { createUser } from './helpers';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import { gameFinishedEventName } from '../../src/services/gameround/gameround.class';

chai.use(spies);

describe('\'gameround\' service', () => {
  it('registered the service', () => {
    const service = app.service('gameround');

    assert.ok(service, 'Registered the service');
  });

  it('starts a new game round', async () => {
    const user = await createUser(app);
    const service = app.service('gameround');
    const params = { user };

    const gameround = await service.create({}, params);

    expect(gameround.id).to.be.above(0);
  });

  it('gets game round with shuffled questions', async () => {
    const user = await createUser(app);
    const service = app.service('gameround');
    const params = { user };
    const gameround = await service.create({}, params);

    const gameroundData = await service.get(gameround.id, params);

    const l = 3;
    expect(gameroundData.questions).to.have.lengthOf(l);
    for (let index = 0; index < l; index++) {
      expect(gameroundData.questions[index], `loop ${index}`).to.be.a('object');
      expect(gameroundData.questions[index]).to.have.property('id');
      expect(gameroundData.questions[index]).to.have.property('description');
      expect(gameroundData.questions[index]).to.have.property('answerA');
      expect(gameroundData.questions[index]).to.have.property('answerB');
      expect(gameroundData.questions[index]).to.have.property('answer');
      expect(gameroundData.questions[index]).to.not.have.property('pointsA');
      expect(gameroundData.questions[index]).to.not.have.property('pointsB');
      expect(gameroundData.questions[index]).to.not.have.property('pointsC');
      expect(gameroundData.questions[index]).to.not.have.property('pointsD');
      expect(gameroundData.questions[index]).to.have.property('kind');
    }
  });

  it('can close a game round', async () => {
    const user = await createUser(app);
    const service = app.service('gameround');
    const params = { user };
    const gameround = await service.create({}, params);

    const gameroundClosedData = await service.patch(gameround.id, { action: 'close' }, params);

    expect(gameroundClosedData.id).to.eq(gameround.id);
  });

  it('emits on closing a game round', async () => {
    const user = await createUser(app);
    const service = app.service('gameround');
    const params = { user };
    const gameround = await service.create({}, params);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const eventReceiver = () => { };
    const spy = chai.spy(eventReceiver);
    service.on(gameFinishedEventName, spy);

    await service.patch(gameround.id, { action: 'close' }, params);

    expect(spy).to.have.been.called();
  });

  it('cannot close a game twice', async () => {
    const user = await createUser(app);
    const service = app.service('gameround');
    const params = { user };
    const gameround = await service.create({}, params);
    await service.patch(gameround.id, { action: 'close' }, params);

    try {
      await service.patch(gameround.id, { action: 'close' }, params) as any;
      assert.fail('Exception not thrown');
    } catch (error) {
      expect(error.code).to.eq(400);
    }
  });

  it('cannot close another user´s game', async () => {
    const user1 = await createUser(app);
    const user2 = await createUser(app);
    const service = app.service('gameround');
    const params = { user: user1 };
    const gameround = await service.create({}, params);

    const r = await service.patch(gameround.id, { action: 'close' }, { user: user2 }) as any;

    expect(r.code).to.eq(404);
  });

  it('has no score on running game', async () => {
    const user = await createUser(app);
    const service = app.service('gameround');
    const params = { user };
    const gameround = await service.create({}, params);

    const gameroundData = await service.get(gameround.id, params);

    expect(gameroundData).to.not.have.property('score');
  });

  it('has score on completed game', async () => {
    const user = await createUser(app);
    const gameroundService = app.service('gameround');
    const answerService = app.service('answer');
    const params = { user };
    const gameround = await gameroundService.create({}, params);
    const gameroundData = await gameroundService.get(gameround.id, params);
    const l = 3;
    for (let index = 0; index < l; index++) {
      const q = gameroundData.questions[index];
      let answer = '';
      if (q.description.startsWith('You')) {
        // pill question
        answer = Math.random() < 0.5 ? 'A' : 'B';
      }
      if (q.description.startsWith('Which')) {
        // language question
        answer = 'BCD';
      }
      if (q.description.startsWith('How')) {
        // jackets question
        answer = 'B';
      }
      await answerService.create({ id: q.id, answer }, params);
    }

    const gameroundClosedData = await gameroundService.patch(gameround.id, { action: 'close' }, params);

    const gameroundDataCompleted = await gameroundService.get(gameround.id, params);

    expect(gameroundClosedData).to.have.property('score');
    expect(gameroundClosedData.score).to.eq(5);
    expect(gameroundDataCompleted).to.have.property('score');
    expect(gameroundDataCompleted.score).to.eq(5);
  });
});
