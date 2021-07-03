import { Injectable } from '@angular/core';
import feathers, { Service } from '@feathersjs/feathers';
import * as rest from '@feathersjs/rest-client';

@Injectable({
  providedIn: 'root'
})
export class FeathersBridgeService {
  gameroundService: Service<any>;

  constructor() {
    const app = feathers();
    const restClient = rest();
    app.configure(restClient.fetch(window.fetch));
    this.gameroundService = app.service('gameround');
  }
}
