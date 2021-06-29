import assert from 'assert';
import app from '../../src/app';

describe('\'question\' service', () => {
  it('registered the service', () => {
    const service = app.service('question');

    assert.ok(service, 'Registered the service');
  });
});
