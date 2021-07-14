import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/state/app.state';
import { quizStateStub } from 'testing/quiz-state-stub';

import { ScoreBoardComponent } from './score-board.component';

describe('ScoreBoardComponent', () => {
  let component: ScoreBoardComponent;
  let store: MockStore;
  let fixture: ComponentFixture<ScoreBoardComponent>;
  const initialState: AppState = { quiz: quizStateStub() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreBoardComponent],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
