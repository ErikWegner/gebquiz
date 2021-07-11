import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { Error404Component } from './pages/error404/error404.component';
import { UsernameComponent } from './pages/username/username.component';
import { FormsModule } from '@angular/forms';
import { QuizComponent } from './pages/quiz/quiz.component';
import { AnswerListingAndResponseComponent } from './components/answer-listing-and-response/answer-listing-and-response.component';
import { AnswerOptionComponent } from './components/answer-option/answer-option.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as QuizReducer from './state/quiz.reducers';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    Error404Component,
    UsernameComponent,
    QuizComponent,
    AnswerListingAndResponseComponent,
    AnswerOptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ quiz: QuizReducer.reducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
