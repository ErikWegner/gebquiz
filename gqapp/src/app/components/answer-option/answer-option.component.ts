import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { answerSelected } from 'src/app/actions/quiz.action';
import { QuizState } from 'src/app/reducers/quiz.reducers';

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

  constructor(
    private store: Store<QuizState>
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
      this.store.dispatch(answerSelected({ answer: this.answerLetter }));
    }
  }
}
