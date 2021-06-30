// Initializes the `answer` service on path `/answer`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Answer, AnswerData } from './answer.class';
import hooks from './answer.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'answer': Answer & ServiceAddons<AnswerData>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/answer', new Answer(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('answer');

  service.hooks(hooks);
}
