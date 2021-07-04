import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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
  let rspy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const activatedRoute = new ActivatedRouteStub();
    const g = jasmine.createSpyObj('GameService', [
      'getQuestion',
    ]);
    const r = jasmine.createSpyObj('Router', [
      'navigate',
    ]);
    await TestBed.configureTestingModule({
      declarations: [QuizComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: GameService, useValue: g },
        { provide: Router, useValue: r },
      ]
    })
      .compileComponents();
    activatedRouteStub = TestBed.inject(ActivatedRoute) as any as ActivatedRouteStub;
    gspy = TestBed.inject(GameService) as jasmine.SpyObj<GameService>;
    rspy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
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
    gspy.getQuestion.and.callFake(() => of({ meta: { nextQuestionNumber: 0, prevQuestionNumber: 0 } }));

    // Act
    fixture.detectChanges();

    // Assert
    expect(gspy.getQuestion).toHaveBeenCalledWith(id, 0);
  });

  it('should navigate to the next question', fakeAsync(() => {
    // Arrange
    const id = randomNumber(900, 100);
    activatedRouteStub.setParamMap({ id });
    gspy.getQuestion.and.callFake(() => of({ meta: { nextQuestionNumber: 1, prevQuestionNumber: 8 } }));
    fixture.detectChanges();
    const button = fixture.debugElement.queryAll(By.css('button.btn-outline-primary'))[1];

    // Act
    button.triggerEventHandler('click', null);
    tick();

    // Assert
    expect(rspy.navigate).toHaveBeenCalledWith(['quiz', id, { q: 1 }])
  }));

  it('should navigate to the previous question', fakeAsync(() => {
    // Arrange
    const id = randomNumber(900, 100);
    activatedRouteStub.setParamMap({ id });
    gspy.getQuestion.and.callFake(() => of({ meta: { nextQuestionNumber: 1, prevQuestionNumber: 17 } }));
    fixture.detectChanges();
    const button = fixture.debugElement.queryAll(By.css('button.btn-outline-primary'))[0];

    // Act
    button.triggerEventHandler('click', null);
    tick();

    // Assert
    expect(rspy.navigate).toHaveBeenCalledWith(['quiz', id, { q: 17 }])
  }));

  it('should query the question when parmMap changes', fakeAsync(() => {
    // Arrange
    const id = randomNumber(900, 100);
    activatedRouteStub.setParamMap({ id });
    gspy.getQuestion.and.callFake(() => of({ meta: { nextQuestionNumber: 1, prevQuestionNumber: 1 } }));
    fixture.detectChanges();

    // Act
    activatedRouteStub.setParamMap({ id, q: 1 });
    tick();

    // Assert
    expect(gspy.getQuestion.calls.allArgs()).toEqual([
      [id, 0],
      [id, 1],
    ]);
  }));
});
