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
  
    it('expects "setDarkMode" to change the storage item', () => {
      spyOn(service.localstorage, 'setItem').and.stub();
      const mode: boolean = true;
  
      service.setDarkMode(mode);
      expect(service.localstorage.setItem).toHaveBeenCalledWith('job-squid--dark-mode', 'true');
    });
});
