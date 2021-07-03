import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getUsername(): string {
    return window.localStorage.getItem('gq_username') || '';
  }
}
