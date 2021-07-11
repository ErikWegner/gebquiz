import { Component, Input, OnInit } from '@angular/core';
import { AnswerKind } from 'src/app/answer-kind';

@Component({
  selector: 'app-answer-listing-and-response',
  templateUrl: './answer-listing-and-response.component.html',
  styleUrls: ['./answer-listing-and-response.component.scss']
})
export class AnswerListingAndResponseComponent implements OnInit {

  @Input()
  public kind: AnswerKind | '' = '';

  @Input()
  public answerA = '';

  @Input()
  public answerB = '';

  @Input()
  public answerC = '';

  @Input()
  public answerD = '';

  constructor() { }

  ngOnInit(): void {
  }

}
