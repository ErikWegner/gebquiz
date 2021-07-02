import '@feathersjs/transport-commons';
import { Application } from './declarations';
import { gameFinishedEventName } from './services/gameround/gameround.class';

export default function(app: Application): void {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', (connection: any): void => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult: any, { connection }: any): void => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if(connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;

      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);
    }
  });

  app.service('gameround').publish(gameFinishedEventName, () => {
    return app.channel('authenticated');
  });
}
