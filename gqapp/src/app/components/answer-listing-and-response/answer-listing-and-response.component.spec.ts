import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AnswerListingAndResponseComponent } from './answer-listing-and-response.component';

@Component({
  selector: 'app-answer-option',
  template: '',
})
export class AnswerOptionStubComponent { }

describe('AnswerListingAndResponseComponent', () => {
  let component: AnswerListingAndResponseComponent;
  let fixture: ComponentFixture<AnswerListingAndResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AnswerListingAndResponseComponent,
        AnswerOptionStubComponent,
      ]
    })
      .compileComponents();
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

    // Act
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement as HTMLElement;
    expect(fixture.debugElement.queryAll(By.directive(AnswerOptionStubComponent)).length).toEqual(2);
  });

  it('should show 4 answers when kind is multiple choice', () => {
    // Arrange

    // Act
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement as HTMLElement;
    expect(fixture.debugElement.queryAll(By.directive(AnswerOptionStubComponent)).length).toEqual(4);
  });

  it('should show 4 answers when kind is single choice', () => {
    // Arrange

    // Act
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement as HTMLElement;
    expect(fixture.debugElement.queryAll(By.directive(AnswerOptionStubComponent)).length).toEqual(4);
  });
});
