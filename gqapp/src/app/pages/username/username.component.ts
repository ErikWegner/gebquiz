import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    this.username = this.ls.getUsername();
  }

}
