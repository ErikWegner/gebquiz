// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { NotFound } from '@feathersjs/errors';
import { Hook, HookContext } from '@feathersjs/feathers';
import Knex from 'knex';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const gamequestionId = context.data.id;
    const userId = context.params.user?.id || -1;
    const db: Knex = context.app.get('knexClient');

    const gdata = await db
      .first({
        user_id: 'games.user_id',
      })
      .table('gamequestions')
      .leftJoin('games', 'games.id', 'gamequestions.game_id')
      .where('gamequestions.id', gamequestionId)
      ;

    if (gdata.user_id != userId) {
      context.result = new NotFound('Question not found');
      context.statusCode = 404;
    }

    return context;
  };
};
