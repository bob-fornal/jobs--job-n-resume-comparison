import { TestBed } from '@angular/core/testing';

import { JobApplicationsService } from './job-applications.service';

describe('JobApplicationsService', () => {
  let service: JobApplicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobApplicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
