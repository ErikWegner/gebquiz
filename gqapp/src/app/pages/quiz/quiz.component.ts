import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { AnswerKind } from 'src/app/answer-kind';
import { GameService } from 'src/app/service/game.service';
import { AppState } from 'src/app/state/app.state';
import { answerSaving } from 'src/app/state/quiz.selector';

declare var bootstrap: { Modal: new (arg0: HTMLElement | null, arg1: any) => any; };

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  gameid = 0;
  questionNumber = 0;
  nextQuestionNumber = 0;
  prevQuestionNumber = 0;
  description = '';
  answerData: { answerA: string; answerB: string; answerC: string; answerD: string; kind: AnswerKind; } | undefined;
  answerSaving$ = this.store.pipe(select(answerSaving));
  askLeave = false;
  modalDlg: any;

  constructor(
    private route: ActivatedRoute,
    private g: GameService,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(d => {
        const gameid = parseInt(d.get('id') || '0', 10);
        const question = d.has('q') ? parseInt(d.get('q') || '0') : 0;
        return { gameid, question };
      }),
      switchMap(d => this.g
        .getQuestion(d.gameid, d.question)
        .pipe(
          map(q => ({ ...d, q }))
        ))
    ).subscribe(gd => {
      this.gameid = gd.gameid;
      this.questionNumber = gd.question;
      this.nextQuestionNumber = gd.q.meta.nextQuestionNumber;
      this.prevQuestionNumber = gd.q.meta.prevQuestionNumber;
      this.description = gd.q.description;
      this.answerData = gd.q.answerData;
    });
  }

  next(): void {
    if (this.nextQuestionNumber === 0 && !this.askLeave) {
      this.askLeave = true;
      this.modalDlg = new bootstrap.Modal(document.getElementById('finalizedlg'), { backdrop: 'static' })
      this.modalDlg.show();
      return
    }
    this.askLeave = false;
    this.router.navigate(['quiz', this.gameid, { q: this.nextQuestionNumber }]);
  }

  prev(): void {
    this.router.navigate(['quiz', this.gameid, { q: this.prevQuestionNumber }]);
  }

  finalize(): void {
    this.g.finalize(this.gameid).subscribe((h) => {
      this.modalDlg.hide();
      this.router.navigate(['board']);
    });
  }
}
