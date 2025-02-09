import { TestBed } from '@angular/core/testing';

import { TopToolbarService } from './top-toolbar.service';

describe('TopToolbarService', () => {
  let service: TopToolbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopToolbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
