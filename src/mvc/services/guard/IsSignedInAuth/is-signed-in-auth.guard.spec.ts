import { TestBed } from '@angular/core/testing';

import { IsSignedInAuthGuard } from './is-signed-in-auth.guard';

describe('IsSignedInAuthGuard', () => {
  let guard: IsSignedInAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsSignedInAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
