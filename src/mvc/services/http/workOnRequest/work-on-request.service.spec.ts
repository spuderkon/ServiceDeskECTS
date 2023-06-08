import { TestBed } from '@angular/core/testing';

import { WorkOnRequestService } from './work-on-request.service';

describe('WorkOnRequestService', () => {
  let service: WorkOnRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkOnRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
