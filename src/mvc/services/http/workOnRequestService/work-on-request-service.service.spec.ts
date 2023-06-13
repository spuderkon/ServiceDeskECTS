import { TestBed } from '@angular/core/testing';

import { WorkOnRequestServiceService } from './work-on-request-service.service';

describe('WorkOnRequestServiceService', () => {
  let service: WorkOnRequestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkOnRequestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
