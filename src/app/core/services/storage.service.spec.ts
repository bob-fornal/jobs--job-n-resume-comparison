import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "getDarkMode to return false if nothing in local storage', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue(null);
    spyOn(service.localstorage, 'setItem').and.stub();

    const result: boolean = service.getDarkMode();
    expect(result).toEqual(false);
    expect(service.localstorage.setItem).toHaveBeenCalledWith('job-squid--dark-mode', 'false');
  });

  it('expects "getDarkMode" to return true of mode is true', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue('true');

    const result: boolean = service.getDarkMode();
    expect(result).toEqual(true);
  });

  it('expects "getDarkMode" to return false of mode is false', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue('false');

    const result: boolean = service.getDarkMode();
    expect(result).toEqual(false);
  });
});
