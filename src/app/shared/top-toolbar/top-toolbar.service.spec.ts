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

  it('expects "initActivePage" to do nothing if null is returned', async () => {
    spyOn(service['storage'], 'getItem').and.resolveTo(null);
    spyOn(service, 'setActivePage').and.stub();

    expect(service.setActivePage).not.toHaveBeenCalled();
  });

  it('expects "initActivePage" to set the active page', async () => {
    spyOn(service['storage'], 'getItem').and.resolveTo('ACTIVE');
    spyOn(service, 'setActivePage').and.stub();

    await service.initActivePage();
    expect(service.setActivePage).toHaveBeenCalledWith('ACTIVE', false);
  });

  it('expects "initViewGoals" to set to false if null is returned', async () => {
    spyOn(service['storage'], 'getItem').and.resolveTo(null);
    spyOn(service['viewGoalsSignal'], 'set').and.stub();

    await service.initViewGoals();
    expect(service['viewGoalsSignal'].set).toHaveBeenCalledWith(false);
  });

  it('expects "initViewGoals" to set to false if false is returned', async () => {
    spyOn(service['storage'], 'getItem').and.resolveTo(false);
    spyOn(service['viewGoalsSignal'], 'set').and.stub();

    await service.initViewGoals();
    expect(service['viewGoalsSignal'].set).toHaveBeenCalledWith(false);
  });

  it('expects "initViewGoals" to set to true if true is returned', async () => {
    spyOn(service['storage'], 'getItem').and.resolveTo(true);
    spyOn(service['viewGoalsSignal'], 'set').and.stub();

    await service.initViewGoals();
    expect(service['viewGoalsSignal'].set).toHaveBeenCalledWith(true);
  });

  it('expects "getDarkMode to return false if nothing in local storage', async () => {
    spyOn(service['storage'], 'getItem').and.resolveTo(null);
    spyOn(service['storage'], 'setItem').and.stub();

    const result: boolean = await service.getDarkMode();
    expect(result).toEqual(false);
    expect(service['storage'].setItem).toHaveBeenCalledWith('toolbar', 'job-squid--dark-mode', false, false);
  });

  it('expects "getDarkMode" to return true of mode is true', async () => {
    spyOn(service['storage'], 'getItem').and.resolveTo(true);

    const result: boolean = await service.getDarkMode();
    expect(result).toEqual(true);
  });

  it('expects "getDarkMode" to return false of mode is false', async () => {
    spyOn(service['storage'], 'getItem').and.resolveTo(false);

    const result: boolean = await service.getDarkMode();
    expect(result).toEqual(false);
  });

  it('expects "setDarkMode" to change the storage item', async () => {
    spyOn(service['storage'], 'setItem').and.stub();
    const mode = true;

    await service.setDarkMode(mode);
    expect(service['storage'].setItem).toHaveBeenCalledWith('toolbar', 'job-squid--dark-mode', true, false);
  });

  it('expects "setViewGoals" to set and store state', async () => {
    const state = true;
    spyOn(service['viewGoalsSignal'], 'set').and.stub();
    spyOn(service['storage'], 'setItem').and.stub();

    await service.setViewGoals(state);
    expect(service['viewGoalsSignal'].set).toHaveBeenCalledWith(state);
    expect(service['storage'].setItem).toHaveBeenCalledWith('toolbar', 'job-squid--view-goals', true, false);
  });

  it('expects "setActivePage" to only set state when local storage is false', async () => {
    const page = 'PAGE';
    const setLocalStorage = false;
    spyOn(service['activePageSignal'], 'set').and.stub();
    spyOn(service['storage'], 'setItem').and.stub();

    await service.setActivePage(page, setLocalStorage);
    expect(service['activePageSignal'].set).toHaveBeenCalledWith(page);
    expect(service['storage'].setItem).not.toHaveBeenCalled();
  });

  it('expects "setActivePage" to set state and store when local storage is true', async () => {
    const page = 'PAGE';
    const setLocalStorage = true;
    spyOn(service['activePageSignal'], 'set').and.stub();
    spyOn(service['storage'], 'setItem').and.stub();

    service.setActivePage(page, setLocalStorage);
    expect(service['activePageSignal'].set).toHaveBeenCalledWith(page);
    expect(service['storage'].setItem).toHaveBeenCalledWith('toolbar', 'job-squid--active-page', page, false);
  });

  it('expects "setMenuItem" to set the signal', () => {
    const page = 'PAGE';
    const item = 'ITEM';
    spyOn(service['menuItemSignal'], 'set').and.stub();

    service.setMenuItem(page, item);
    expect(service['menuItemSignal'].set).toHaveBeenCalledWith({ page, item });
  });
});
