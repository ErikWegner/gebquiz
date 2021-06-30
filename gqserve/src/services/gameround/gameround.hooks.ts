import * as authentication from '@feathersjs/authentication';
import { Application } from '../../declarations';
import { fastJoin, ResolverMap } from 'feathers-hooks-common';
import { GameRoundData } from './gameround.class';
import Knex from 'knex';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const postResolvers = {
  joins: {
    questions: (..._args: any[]) => async (game: GameRoundData, { app }: { app: Application }) => {
      const db: Knex = app.get('knexClient');
      const questions = await (db
        .select({
          id: 'gamequestions.id',
          description: 'questions.description',
          answerA: 'questions.answerA',
          answerB: 'questions.answerB',
          answerC: 'questions.answerC',
          answerD: 'questions.answerD',
          pointsA: 'questions.pointsA',
          pointsB: 'questions.pointsB',
          pointsC: 'questions.pointsC',
          pointsD: 'questions.pointsD',
          kind: 'questions.kind',
        })
        .table('questions')
        .leftJoin('gamequestions', 'questions.id', 'gamequestions.question_id')
        .where('gamequestions.game_id', game.id)
        .orderBy('gamequestions.id'));
      game.questions = questions as any;
    },
  }
};

export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [fastJoin(postResolvers as any)],
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
