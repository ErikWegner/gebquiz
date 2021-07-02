// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { NotFound } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import Knex from 'knex';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {
  rel: '',
}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const userId = context.params.user?.id || -1;
    const db: Knex = context.app.get('knexClient');

    let gdata: { user_id: number } = { user_id: -1 };

    if (options.rel === 'gamequestions') {
      const gamequestionId = context.data?.id || -1;
      gdata = await db
        .first({
          user_id: 'games.user_id',
        })
        .table('gamequestions')
        .leftJoin('games', 'games.id', 'gamequestions.game_id')
        .where('gamequestions.id', gamequestionId);
    }
    if (options.rel === 'game') {
      gdata = await db
        .first(['user_id'])
        .table('games')
        .where('games.id', context.id || -1);
    }

    if (gdata.user_id != userId) {
      context.result = new NotFound('Question not found');
      context.statusCode = 404;
    }

    return context;
  };
};
