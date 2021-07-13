import { Component, HostBinding, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  // ...
} from '@angular/animations';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
  animations: [
    trigger('waitProgress', [
      state('progress', style({
        width: 0
      })),
      transition('* => progress', [
        animate('10s',
          keyframes([
            style({ width: '*', offset: 0 }),
            style({ width: 0, offset: 0.95 }),
            style({ width: 0, offset: 1 }),
          ])
        )
      ])
    ]),
    trigger('waitShrink', [
      state('shrink', style({
        height: 0
      })),
      transition('* => shrink', [
        animate('10s',
          keyframes([
            style({ height: '*', offset: 0 }),
            style({ height: '*', offset: 0.95 }),
            style({ height: 0, offset: 1 }),
          ])
        )
      ])
    ]),
  ]
})
export class ScoreBoardComponent implements OnInit {

  classes = [
    'h1', 'h1', 'h2', 'h3', 'h3', 'h3', 'h4', 'h4', 'h5', 'h5', 'h6', 'h6',
  ]

  highscores$ = this.g.getHighscores();
  earnedPoints = -1;

  constructor(
    private g: GameService,
  ) { }

  ngOnInit(): void {
    this.earnedPoints = this.g.lastScore;
  }

}
