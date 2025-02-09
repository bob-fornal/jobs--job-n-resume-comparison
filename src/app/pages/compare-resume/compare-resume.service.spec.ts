import { TestBed } from '@angular/core/testing';

import { CompareResumeService } from './compare-resume.service';

describe('CompareResumeService', () => {
  let service: CompareResumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareResumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
