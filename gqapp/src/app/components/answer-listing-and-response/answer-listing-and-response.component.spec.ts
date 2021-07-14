import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/state/app.state';
import { quizStateStub } from 'testing/quiz-state-stub';
import { AnswerOptionComponent } from '../answer-option/answer-option.component';

import { AnswerListingAndResponseComponent } from './answer-listing-and-response.component';

describe('AnswerListingAndResponseComponent', () => {
  let component: AnswerListingAndResponseComponent;
  let fixture: ComponentFixture<AnswerListingAndResponseComponent>;
  let store: MockStore;
  const initialState: AppState = { quiz: quizStateStub() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AnswerListingAndResponseComponent,
        AnswerOptionComponent,
      ],
      providers: [
        provideMockStore({ initialState }),
      ],
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerListingAndResponseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show 2 answers', () => {
    // Arrange
    fixture.componentInstance.kind = 'A';

    // Act
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement as HTMLElement;
    expect(fixture.debugElement.queryAll(By.directive(AnswerOptionComponent)).length).toEqual(2);
  });

  it('should show 4 answers when kind is multiple choice', () => {
    // Arrange
    fixture.componentInstance.kind = 'm';

    // Act
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement as HTMLElement;
    expect(fixture.debugElement.queryAll(By.directive(AnswerOptionComponent)).length).toEqual(4);
  });

  it('should show 4 answers when kind is single choice', () => {
    // Arrange
    fixture.componentInstance.kind = 'c';

    // Act
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement as HTMLElement;
    expect(fixture.debugElement.queryAll(By.directive(AnswerOptionComponent)).length).toEqual(4);
  });
});
