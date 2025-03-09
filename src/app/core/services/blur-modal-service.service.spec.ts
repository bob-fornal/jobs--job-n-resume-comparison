import { TestBed } from '@angular/core/testing';

import { BlurModalService } from './blur-modal-service.service';

describe('BlurModalService', () => {
  let service: BlurModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlurModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
