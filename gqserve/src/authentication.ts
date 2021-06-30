import { Params, ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationBaseStrategy, AuthenticationRequest, AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';
import omit from 'lodash/omit';

import { Application } from './declarations';
import { NotAuthenticated } from '@feathersjs/errors';

declare module './declarations' {
  interface ServiceTypes {
    'authentication': AuthenticationService & ServiceAddons<any>;
  }
}

class UsernameOnlyStrategy extends AuthenticationBaseStrategy {
  private errorMessage = 'Invalid login';

  get configuration() {
    const authConfig = this.authentication?.configuration;
    const config = super.configuration || {};

    return {
      service: authConfig.service,
      entity: authConfig.entity,
      errorMessage: 'Invalid login',
      entityUsernameField: config.usernameField,
      ...config
    };
  }

  async findEntity(username: string, params: Params) {
    if (!username) { // don't query for users without any condition set.
      throw new NotAuthenticated(this.errorMessage);
    }

    const query = {
      $limit: 1,
      name: username,
    };

    const findParams = Object.assign({}, params, { query });
    const entityService = this.entityService;

    const result = await entityService.find(findParams);
    const list = Array.isArray(result) ? result : result.data;

    if (!Array.isArray(list) || list.length === 0) {
      return null;
    }

    const [entity] = list;

    return entity;
  }

  async authenticate(data: AuthenticationRequest, params: Params) {
    const username = data['name'];
    let result = await this.findEntity(username, omit(params, 'provider'));
    if (result === null) {
      result = await this.entityService.create({ name: username }, omit(params, 'provider'));
    }

    return {
      authentication: { strategy: this.name },
      ['user']: result
    };
  }
}

export default function(app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new UsernameOnlyStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
}
