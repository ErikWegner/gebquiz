// Initializes the `highscore` service on path `/highscore`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Highscore } from './highscore.class';
import hooks from './highscore.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'highscore': Highscore & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/highscore', new Highscore(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('highscore');

  service.hooks(hooks);
}
