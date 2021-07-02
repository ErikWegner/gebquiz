import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  apptitle = environment.apptitle;
  welcometext = environment.welcometext;

  constructor() { }

  ngOnInit(): void {
  }

}
