import { TestBed } from '@angular/core/testing';

import { DeclarantService } from './declarant.service';

describe('DeclarantService', () => {
  let service: DeclarantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeclarantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
