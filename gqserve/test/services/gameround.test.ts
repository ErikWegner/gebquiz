import assert from 'assert';
import app from '../../src/app';
import { createUser } from './helpers';
import { expect } from 'chai';
import { Params } from '@feathersjs/feathers';

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
      expect(gameroundData.questions[index]).to.have.property('pointsA');
      expect(gameroundData.questions[index]).to.have.property('pointsB');
      expect(gameroundData.questions[index]).to.have.property('kind');
    }
  });
});
