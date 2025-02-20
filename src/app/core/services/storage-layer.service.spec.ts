import { TestBed } from '@angular/core/testing';

import { StorageLayerService } from './storage-layer.service';

describe('StorageLayerService', () => {
  let service: StorageLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageLayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
