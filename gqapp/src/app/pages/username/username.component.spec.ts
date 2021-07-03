import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { randomString } from 'testing/utils';

import { UsernameComponent } from './username.component';

describe('UsernameComponent', () => {
  let component: UsernameComponent;
  let fixture: ComponentFixture<UsernameComponent>;
  let lsspy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    const ls = jasmine.createSpyObj(LocalStorageService, [
      'getUsername'
    ]);
    await TestBed.configureTestingModule({
      declarations: [UsernameComponent],
      imports: [FormsModule],
      providers: [
        { provide: LocalStorageService, useValue: ls },
      ]
    })
      .compileComponents();

    lsspy = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
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
});
