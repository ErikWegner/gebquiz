import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { Error404Component } from './pages/error404/error404.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ScoreBoardComponent } from './pages/score-board/score-board.component';
import { UsernameComponent } from './pages/username/username.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'username', component: UsernameComponent },
  { path: 'quiz/:id', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'board', component: ScoreBoardComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
