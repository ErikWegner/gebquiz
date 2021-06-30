import assert from 'assert';
import app from '../../src/app';
import { createUser } from './helpers';
import { expect } from 'chai';

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

  it('starts a new game round with shuffled questions', async () => {
    const user = await createUser(app);
    const service = app.service('gameround');
    const params = { user };
    const gameround = await service.create({}, params);

    const gameroundData = await service.get(gameround.id, params);

    expect(gameroundData.questions).to.have.lengthOf(3);
  });
});
