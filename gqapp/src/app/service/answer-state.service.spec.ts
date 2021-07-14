import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { quizStateStub } from 'testing/quiz-state-stub';
import { AppState } from '../state/app.state';

import { AnswerStateService } from './answer-state.service';

describe('AnswerStateService', () => {
  let service: AnswerStateService;
  let store: MockStore;

  beforeEach(() => {
    const initialState: AppState = { quiz: quizStateStub() };
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
      ],
    });
    service = TestBed.inject(AnswerStateService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
