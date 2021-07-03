import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeathersBridgeService } from 'src/app/service/feathers-bridge.service';
import { GameService } from 'src/app/service/game.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {
  username = '';
  errormessage = '';

  constructor(
    private ls: LocalStorageService,
    private f: FeathersBridgeService,
    private g: GameService,
    private r: Router,
  ) { }

  ngOnInit(): void {
    this.username = this.ls.getUsername();
  }

  async login(): Promise<void> {
    this.ls.saveUsername(this.username);
    await this.f.login(this.username);
    this.g.startGame().subscribe(gamedata => {
      this.r.navigate(['/quiz', gamedata.gameid]);
    }, err => {
      this.errormessage = err;
    });
  }
}
