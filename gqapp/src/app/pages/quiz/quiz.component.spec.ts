import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GameService } from 'src/app/service/game.service';
import { ActivatedRouteStub } from 'testing/activated-route-stub';
import { randomNumber } from 'testing/utils';

import { QuizComponent } from './quiz.component';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let activatedRouteStub: ActivatedRouteStub;
  let gspy: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    const activatedRoute = new ActivatedRouteStub();
    const g = jasmine.createSpyObj('GameService', [
      'getQuestion',
    ]);
    await TestBed.configureTestingModule({
      declarations: [QuizComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: GameService, useValue: g },
      ]
    })
      .compileComponents();
    activatedRouteStub = TestBed.inject(ActivatedRoute) as any as ActivatedRouteStub;
    gspy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load the game data', () => {
    // Arrange
    const id = randomNumber(900, 100);
    activatedRouteStub.setParamMap({ id });
    gspy.getQuestion.and.callFake(() => of(null));

    // Act
    fixture.detectChanges();

    // Assert
    expect(gspy.getQuestion).toHaveBeenCalledWith(id, 0);
  });
});
