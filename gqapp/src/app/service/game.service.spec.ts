import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Service } from '@feathersjs/feathers';
import { randomNumber } from 'testing/utils';
import { FeathersBridgeService } from './feathers-bridge.service';
import { quizStateStub } from 'testing/quiz-state-stub';
import { AppState } from '../state/app.state';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;
  let store: MockStore;
  let next: jasmine.Spy;
  let gameroundService: jasmine.SpyObj<Service<any>>;
  const initialState: AppState = { quiz: quizStateStub() };

  beforeEach(() => {
    next = jasmine.createSpy('next');
    gameroundService = jasmine.createSpyObj('Service', ['create']);
    const f = jasmine.createSpyObj('FeathersBridgeService', [], {
      gameroundService,
    });
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        { provide: FeathersBridgeService, useValue: f },
      ]
    });
    service = TestBed.inject(GameService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return id from server when starting a game', fakeAsync(() => {
    // Arrange
    const gameid = randomNumber(9000, 1000);
    gameroundService.create.and.returnValue(Promise.resolve({ id: gameid }));

    // Act
    service.startGame().subscribe(next);
    tick();

    // Assert
    expect(next).toHaveBeenCalledWith({ gameid });
  }));
});
