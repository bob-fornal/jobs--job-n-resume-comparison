import { TestBed } from '@angular/core/testing';

import { DaysOfCodeService } from './days-of-code.service';

describe('DaysOfCodeService', () => {
  let service: DaysOfCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaysOfCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
