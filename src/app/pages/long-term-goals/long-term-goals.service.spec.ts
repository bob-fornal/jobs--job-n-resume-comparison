import { TestBed } from '@angular/core/testing';

import { LongTermGoalsService } from './long-term-goals.service';

describe('LongTermGoalsService', () => {
  let service: LongTermGoalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LongTermGoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
