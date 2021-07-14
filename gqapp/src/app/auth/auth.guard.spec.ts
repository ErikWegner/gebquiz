import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuardGuard', () => {
  let guard: AuthGuard;
  let rspy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const r = jasmine.createSpyObj('Router', [
      'navigate',
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: r }
      ]
    });
    rspy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
