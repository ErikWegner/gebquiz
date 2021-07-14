import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/state/app.state';
import { quizStateStub } from 'testing/quiz-state-stub';

import { AnswerOptionComponent } from './answer-option.component';

describe('AnswerOptionComponent', () => {
  let component: AnswerOptionComponent;
  let store: MockStore;
  let fixture: ComponentFixture<AnswerOptionComponent>;
  const initialState: AppState = { quiz: quizStateStub() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnswerOptionComponent],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
