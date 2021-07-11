import { Injectable, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { answerToBeSaved } from '../state/quiz.selector';

@Injectable({
  providedIn: 'root'
})
export class AnswerStateService implements OnInit {
  answerSaving$ = this.store.pipe(select(answerToBeSaved));
  constructor(
    private store: Store<AppState>,
  ) { }
  ngOnInit(): void {
    this.answerSaving$.subscribe(d => console.log(d));
  }
}
