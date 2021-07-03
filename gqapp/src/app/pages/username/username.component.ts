import { Component, OnInit } from '@angular/core';
import { FeathersBridgeService } from 'src/app/service/feathers-bridge.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {
  username = '';

  constructor(
    private ls: LocalStorageService,
    private f: FeathersBridgeService,
  ) { }

  ngOnInit(): void {
    this.username = this.ls.getUsername();
  }

  async login(): Promise<void> {
    this.ls.saveUsername(this.username);
    await this.f.login(this.username);
  }
}
