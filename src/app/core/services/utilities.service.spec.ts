import { TestBed } from '@angular/core/testing';

import { UtilitiesService } from './utilities.service';

describe('UtilitiesService', () => {
  let service: UtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "toDatetimestamp" to return a formatted date/time', () => {
    const date = new Date('2025-04-04 22:00:00.000');

    const result = service.toDatetimestamp(date);
    expect(result).toEqual('2025-04-04 22:00:00');
  });
});
