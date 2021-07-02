import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Error404Component } from './error404.component';

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [Error404Component],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to root on click', () => {
    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    const spy = TestBed.inject(Router).navigateByUrl as jasmine.Spy;
    expect(spy).toHaveBeenCalledOnceWith('/');
  });
});
