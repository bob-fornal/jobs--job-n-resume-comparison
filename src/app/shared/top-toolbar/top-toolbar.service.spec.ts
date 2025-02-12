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

  it('expects "init" to trigger page and goal initialization', () => {
    spyOn(service, 'initActivePage').and.stub();
    spyOn(service, 'initViewGoals').and.stub();

    service.init();
    expect(service.initActivePage).toHaveBeenCalled();
    expect(service.initViewGoals).toHaveBeenCalled();
  });

  it('expects "initActivePage" to do nothing if null is returned', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue(null);
    spyOn(service, 'setActivePage').and.stub();

    service.initActivePage();
    expect(service.setActivePage).not.toHaveBeenCalled();
  });

  it('expects "initActivePage" to set the active page', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue('ACTIVE');
    spyOn(service, 'setActivePage').and.stub();

    service.initActivePage();
    expect(service.setActivePage).toHaveBeenCalledWith('ACTIVE', false);
  });

  it('expects "initViewGoals" to set to false if null is returned', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue(null);
    spyOn(service['viewGoalsSignal'], 'set').and.stub();

    service.initViewGoals();
    expect(service['viewGoalsSignal'].set).toHaveBeenCalledWith(false);
  });

  it('expects "initViewGoals" to set to false if false is returned', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue('false');
    spyOn(service['viewGoalsSignal'], 'set').and.stub();

    service.initViewGoals();
    expect(service['viewGoalsSignal'].set).toHaveBeenCalledWith(false);
  });

  it('expects "initViewGoals" to set to true if true is returned', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue('true');
    spyOn(service['viewGoalsSignal'], 'set').and.stub();

    service.initViewGoals();
    expect(service['viewGoalsSignal'].set).toHaveBeenCalledWith(true);
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

  it('expects "setViewGoals" to set and store state', () => {
    const state: boolean = true;
    spyOn(service['viewGoalsSignal'], 'set').and.stub();
    spyOn(service.localstorage, 'setItem').and.stub();

    service.setViewGoals(state);
    expect(service['viewGoalsSignal'].set).toHaveBeenCalledWith(state);
    expect(service.localstorage.setItem).toHaveBeenCalledWith('job-squid--view-goals', 'true');
  });

  it('expects "setActivePage" to only set state when local storage is false', () => {
    const page: string = 'PAGE';
    const setLocalStorage: boolean = false;
    spyOn(service['activePageSignal'], 'set').and.stub();
    spyOn(service.localstorage, 'setItem').and.stub();

    service.setActivePage(page, setLocalStorage);
    expect(service['activePageSignal'].set).toHaveBeenCalledWith(page);
    expect(service.localstorage.setItem).not.toHaveBeenCalled();
  });

  it('expects "setActivePage" to set state and store when local storage is true', () => {
    const page: string = 'PAGE';
    const setLocalStorage: boolean = true;
    spyOn(service['activePageSignal'], 'set').and.stub();
    spyOn(service.localstorage, 'setItem').and.stub();

    service.setActivePage(page, setLocalStorage);
    expect(service['activePageSignal'].set).toHaveBeenCalledWith(page);
    expect(service.localstorage.setItem).toHaveBeenCalledWith('job-squid--active-page', page);
  });

  it('expects "setMenuItem" to set the signal', () => {
    const page: string = 'PAGE';
    const item: string = 'ITEM';
    spyOn(service['menuItemSignal'], 'set').and.stub();

    service.setMenuItem(page, item);
    expect(service['menuItemSignal'].set).toHaveBeenCalledWith({ page, item });
  });
});
