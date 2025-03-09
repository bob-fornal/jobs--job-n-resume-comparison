import { TestBed } from '@angular/core/testing';

import { LongTermGoalsService } from './long-term-goals.service';
import { LongTermGoal } from '../../core/interfaces/structure-goals.interface';

describe('LongTermGoalsService', () => {
  let service: LongTermGoalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LongTermGoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "init" to initiate loading goals', async () => {
    spyOn(service, 'loadGoals').and.stub();

    await service.init();
    expect(service.loadGoals).toHaveBeenCalled();
  });

  it('expects "handleMenuItemEffect" to do nothing', () => {
    const value: { page: string, item: string} = {
      page: 'resumes',
      item: 'export-current-resumes',
    };
    spyOn(service, 'menuItem').and.returnValue(value);
    spyOn(service, 'exportLongTermGoals').and.stub();
    spyOn(service, 'importLongTermGoals').and.stub();

    service.handleMenuItemEffect();
    expect(service.exportLongTermGoals).not.toHaveBeenCalled();
    expect(service.importLongTermGoals).not.toHaveBeenCalled();
  });

  it('expects "handleMenuItemEffect" to handle export', () => {
    const value: { page: string, item: string} = {
      page: 'long-term-goals',
      item: 'export-current-long-term-goals',
    };
    spyOn(service, 'menuItem').and.returnValue(value);
    spyOn(service, 'exportLongTermGoals').and.stub();

    service.handleMenuItemEffect();
    expect(service.exportLongTermGoals).toHaveBeenCalled();
  });

  it('expects "handleMenuItemEffect" to handle import', () => {
    const value: { page: string, item: string} = {
      page: 'long-term-goals',
      item: 'import-saved-long-term-goals',
    };
    spyOn(service, 'menuItem').and.returnValue(value);
    spyOn(service, 'importLongTermGoals').and.stub();

    service.handleMenuItemEffect();
    expect(service.importLongTermGoals).toHaveBeenCalled();
  });

  it('expects "loadGoals" to do nothing if storage is empty', async () => {
    spyOn(service['storage'], 'getItem').and.resolveTo(null);
    spyOn(service.structureSignal, 'set').and.stub();

    await service.loadGoals();
    expect(service.structureSignal.set).not.toHaveBeenCalled();
  });

  it('expects "loadGoals" to update structure with goals', async () => {
    spyOn(service['storage'], 'getItem').and.resolveTo([]);
    spyOn(service.structureSignal, 'set').and.stub();

    await service.loadGoals();
    expect(service.structureSignal.set).toHaveBeenCalledWith([]);
  });

  it('expects "saveGoals" to sort and save goals', async () => {
    const goals: Array<LongTermGoal> = [
      { title: 'TITLE-A', active: false, description: '', summary: '', checklist: [] },
      { title: 'TITLE-D', active: true, description: '', summary: '', checklist: [] },
      { title: 'TITLE-C', active: true, description: '', summary: '', checklist: [] },
      { title: 'TITLE-B', active: false, description: '', summary: '', checklist: [] },
    ];
    const expected: Array<LongTermGoal> = [
      { title: 'TITLE-C', active: true, description: '', summary: '', checklist: [] },
      { title: 'TITLE-D', active: true, description: '', summary: '', checklist: [] },
      { title: 'TITLE-A', active: false, description: '', summary: '', checklist: [] },
      { title: 'TITLE-B', active: false, description: '', summary: '', checklist: [] },
    ];
    spyOn(service.structureSignal, 'set').and.stub();
    spyOn(service['storage'], 'setItem').and.resolveTo();

    await service.saveGoals(goals);
    expect(service.structureSignal.set).toHaveBeenCalledWith(expected);
    expect(service['storage'].setItem).toHaveBeenCalledWith('long-term-goals', 'job-squid--long-term-goals', expected);
  });

  it('expects "exportLongTermGoals" to save structure', () => {
    spyOn(service, 'structure').and.returnValue([]);
    spyOn(service, 'saveAs').and.stub();

    service.exportLongTermGoals();
    expect(service.saveAs).toHaveBeenCalledWith(jasmine.any(Blob), 'current-long-term-goals.json');
  });

  it('expects "importLongTermGoals" to set the signal to active', () => {
    spyOn(service.triggerImportSignal, 'set').and.stub();

    service.importLongTermGoals();
    expect(service.triggerImportSignal.set).toHaveBeenCalledWith('active');
  });

  it('expects "clearTriggerImport" to set the signal to inactive', () => {
    spyOn(service.triggerImportSignal, 'set').and.stub();

    service.clearTriggerImport();
    expect(service.triggerImportSignal.set).toHaveBeenCalledWith('inactive');
  });
});
