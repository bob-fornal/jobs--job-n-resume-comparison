import { TestBed } from '@angular/core/testing';

import { SearchPatternsService } from './search-patterns.service';

describe('SearchPatternsService', () => {
  let service: SearchPatternsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchPatternsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
