import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterLinkStubDirective } from 'testing/routerlink-stub.directive';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent, RouterLinkStubDirective],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to username page on click', () => {
    const button = fixture.debugElement.queryAll(By.css('a'))[0];
    const dir = button.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective;

    button.triggerEventHandler('click', null);

    expect(dir.navigatedTo).toEqual('/username');
  });
});
