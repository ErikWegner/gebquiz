import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FeathersBridgeService } from 'src/app/service/feathers-bridge.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { randomString } from 'testing/utils';

import { UsernameComponent } from './username.component';

describe('UsernameComponent', () => {
  let component: UsernameComponent;
  let fixture: ComponentFixture<UsernameComponent>;
  let lsspy: jasmine.SpyObj<LocalStorageService>;
  let fspy: jasmine.SpyObj<FeathersBridgeService>;

  beforeEach(async () => {
    const ls = jasmine.createSpyObj(LocalStorageService, [
      'getUsername',
      'saveUsername',
    ]);
    const f = jasmine.createSpyObj(FeathersBridgeService, [
      'login',
    ]);
    await TestBed.configureTestingModule({
      declarations: [UsernameComponent],
      imports: [FormsModule],
      providers: [
        { provide: FeathersBridgeService, useValue: f },
        { provide: LocalStorageService, useValue: ls },
      ]
    })
      .compileComponents();

    lsspy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
    fspy = TestBed.inject(FeathersBridgeService) as jasmine.SpyObj<FeathersBridgeService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show username from localstorage on form', fakeAsync(() => {
    // Arrange
    const username = randomString(20, 'user-');
    lsspy.getUsername.and.returnValue(username);
    fixture.detectChanges();

    // Act
    tick();

    // Assert
    const el = fixture.nativeElement as HTMLElement;
    const iel = el.querySelector('input');
    expect(iel?.value).toBe(username);
  }));

  it('should use username to login', fakeAsync(() => {
    // Arrange
    fixture.detectChanges();
    const username = randomString(20, 'user-');
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = username;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button'));
    fspy.login.and.callFake(() => of(true).pipe(delay(10)).toPromise());

    // Act
    button.triggerEventHandler('click', null);
    tick(20);

    // Assert
    expect(lsspy.saveUsername).toHaveBeenCalledWith(username);
    expect(fspy.login).toHaveBeenCalledWith(username);
    // call start game
    // navigate to game screen
  }));
});
