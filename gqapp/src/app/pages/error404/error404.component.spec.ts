import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkStubDirective } from 'testing/routerlink-stub.directive';

import { Error404Component } from './error404.component';

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Error404Component, RouterLinkStubDirective],
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
    const button = fixture.debugElement.query(By.css('a'));
    const dir = button.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective;

    button.triggerEventHandler('click', null);

    expect(dir.navigatedTo).toEqual('/');
  });
});
