import { Application } from '../../src/declarations';
import { UserData } from '../../src/services/users/users.class';

export const createUser = async (app: Application, options?: { name?: string }): Promise<UserData> => {
  const user = await app.service('users').create({
    name: options?.name || 'alice',
  });
  return user as UserData;
};
