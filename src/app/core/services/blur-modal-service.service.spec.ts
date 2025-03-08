import { TestBed } from '@angular/core/testing';

import { BlurModalServiceService } from './blur-modal-service.service';

describe('BlurModalServiceService', () => {
  let service: BlurModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlurModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
