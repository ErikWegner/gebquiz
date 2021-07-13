import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {

  classes = [
    'h1', 'h1', 'h2', 'h3', 'h3', 'h3', 'h4', 'h4', 'h5', 'h5', 'h6', 'h6',
  ]

  highscores$ = this.g.getHighscores();

  constructor(
    private g: GameService,
  ) { }

  ngOnInit(): void { }

}
