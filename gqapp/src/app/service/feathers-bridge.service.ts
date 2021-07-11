import { Injectable } from '@angular/core';
import feathers, { Service } from '@feathersjs/feathers';
import * as rest from '@feathersjs/rest-client';
import feathersAuthClient from '@feathersjs/authentication-client';

@Injectable({
  providedIn: 'root'
})
export class FeathersBridgeService {

  private _loggedIn: boolean;
  public get loggedIn(): boolean {
    return this._loggedIn;
  }

  private feathers = feathers();
  private feathersAuthClient = feathersAuthClient({
    storage: window.localStorage
  });
  gameroundService: Service<any>;

  constructor() {
    this._loggedIn = false;
    const restClient = rest();
    this.feathers
      .configure(restClient.fetch(window.fetch))
      .configure(this.feathersAuthClient)// add authentication plugin
    this.gameroundService = this.feathers.service('gameround');
  }

  public async login(username: string): Promise<boolean> {
    await this.feathers.authenticate({
      "strategy": "local",
      "name": username
    });
    this._loggedIn = true;
    return true;
  }

  public async reauthenticate(): Promise<boolean> {
    if (this._loggedIn) {
      return true;
    }

    try {
      await this.feathers.reAuthenticate();
      return true;
    } catch {

    }
    return false;
  }
}
