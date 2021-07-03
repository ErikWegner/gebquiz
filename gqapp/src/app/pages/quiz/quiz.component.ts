import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  gameid = 0;
  question = 0;

  constructor(
    private route: ActivatedRoute,
    private g: GameService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(d => {
        const gameid = parseInt(d.get('id') || '0', 10);
        const question = d.has('q') ? parseInt(d.get('d') || '0') : 0;
        return { gameid, question };
      }),
      switchMap(d => this.g.getQuestion(d.gameid, d.question))
    ).subscribe();
  }

}
