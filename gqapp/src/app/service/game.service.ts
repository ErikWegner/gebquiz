import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  public startGame(): Observable<{ gameid: number }> {
    return of();
  }
}
