import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerStateService {

  constructor() { }

  public select(answer: string): void { }

  public deselect(answer: string): void { }
}
