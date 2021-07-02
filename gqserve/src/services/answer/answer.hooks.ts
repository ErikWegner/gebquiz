import * as authentication from '@feathersjs/authentication';
import { BadRequest } from '@feathersjs/errors';
import Knex from 'knex';
import { HookContext } from '../../app';
import user_is_owner from '../../hooks/user_is_owner';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const game_is_active = (options = {}) => {
  return async (context: HookContext): Promise<HookContext> => {
    const db: Knex = context.app.get('knexClient');

    const gamequestionId = context.data?.id || -1;
    const gdata = await db
      .first(['end'])
      .table('gamequestions')
      .leftJoin('games', 'games.id', 'gamequestions.game_id')
      .where('gamequestions.id', gamequestionId);

    if (gdata.end) {
      context.result = new BadRequest('Game already inactive');
      context.statusCode = 400;
    }

    return context;
  };
};

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [game_is_active(), user_is_owner({ rel: 'gamequestions' })],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
