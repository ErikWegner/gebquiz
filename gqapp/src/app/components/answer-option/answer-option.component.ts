import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { answerClicked } from 'src/app/state/quiz.action';
import { answerSaving } from 'src/app/selectors/answer-saving.selector';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-answer-option',
  templateUrl: './answer-option.component.html',
  styleUrls: ['./answer-option.component.scss']
})
export class AnswerOptionComponent implements OnInit {
  @Input()
  public answerLetter = '';

  @Input()
  public answerText = '';

  answerSaving$ = this.store.pipe(select(answerSaving));

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  click(): void {
    if (
      this.answerLetter === 'A' ||
      this.answerLetter === 'B' ||
      this.answerLetter === 'C' ||
      this.answerLetter === 'D'
    ) {
      this.store.dispatch(answerClicked({ answer: this.answerLetter }));
    }
  }
}
