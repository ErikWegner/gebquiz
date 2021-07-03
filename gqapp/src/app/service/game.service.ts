import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FeathersBridgeService } from './feathers-bridge.service';

interface CreateGameData {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private fbs: FeathersBridgeService) { }

  public startGame(): Observable<{ gameid: number }> {
    return new Observable(observer => {
      this.fbs.gameroundService
        .create({})
        .then((d: CreateGameData) => observer.next({ gameid: d.id }))
        .catch(reason => observer.error(reason))
        .finally(() => observer.complete());
    });
  }
}
