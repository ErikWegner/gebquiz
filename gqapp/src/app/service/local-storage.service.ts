import { Injectable } from '@angular/core';

const storageKeys = {
  username: 'gq_username',
};

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getUsername(): string {
    return window.localStorage.getItem(storageKeys.username) || '';
  }

  public saveUsername(name: string): void {
    window.localStorage.setItem(storageKeys.username, name);
  }
}
