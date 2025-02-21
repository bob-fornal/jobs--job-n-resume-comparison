import { TestBed } from '@angular/core/testing';

import { DaysOfCodeService } from './days-of-code.service';
import { Structure } from '../../core/interfaces/strucuture.interface';

describe('DaysOfCodeService', () => {
  let service: DaysOfCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaysOfCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "handleViewGoalEffects" to capture value and update structure', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [
        { number: 1, note: 'NOTE', done: false },
      ],
      goals: [
        { description: 'DESCRIPTION', done: false },
      ],
    };
    service._structure = structure;
    spyOn(service, 'viewGoals').and.returnValue(true);
    spyOn(service, 'storeStructure').and.stub();
    spyOn(service, 'loadStructure').and.stub();

    service.handleViewGoalsEffect();
    expect(service.viewGoals).toHaveBeenCalled();
    expect(service.storeStructure).toHaveBeenCalledWith(structure);
    expect(service.loadStructure).toHaveBeenCalled();
  });

  it('expects "handleMenuItem" to do nothing if page is not days-fo-code', () => {
    const menuItem: any = { page: 'NOT-days-of-code', item: '' };
    spyOn(service, 'menuItem').and.returnValue(menuItem);
    spyOn(service, 'exportBlankRecordset').and.stub();
    spyOn(service, 'exportCurrentRecordset').and.stub();
    spyOn(service, 'importSavedRecordset').and.stub();

    service.handleMenuItemEffect();
    expect(service.exportBlankRecordset).not.toHaveBeenCalled();
    expect(service.exportCurrentRecordset).not.toHaveBeenCalled();
    expect(service.importSavedRecordset).not.toHaveBeenCalled();
  });

  it('expects "handleMenuItem" to handle export-blank-recordset', () => {
    const menuItem: any = { page: 'days-of-code', item: 'export-blank-recordset' };
    spyOn(service, 'menuItem').and.returnValue(menuItem);
    spyOn(service, 'exportBlankRecordset').and.stub();
    spyOn(service, 'exportCurrentRecordset').and.stub();
    spyOn(service, 'importSavedRecordset').and.stub();

    service.handleMenuItemEffect();
    expect(service.exportBlankRecordset).toHaveBeenCalled();
    expect(service.exportCurrentRecordset).not.toHaveBeenCalled();
    expect(service.importSavedRecordset).not.toHaveBeenCalled();
  });

  it('expects "handleMenuItem" to handle export-current-recordset', () => {
    const menuItem: any = { page: 'days-of-code', item: 'export-current-recordset' };
    spyOn(service, 'menuItem').and.returnValue(menuItem);
    spyOn(service, 'exportBlankRecordset').and.stub();
    spyOn(service, 'exportCurrentRecordset').and.stub();
    spyOn(service, 'importSavedRecordset').and.stub();

    service.handleMenuItemEffect();
    expect(service.exportBlankRecordset).not.toHaveBeenCalled();
    expect(service.exportCurrentRecordset).toHaveBeenCalled();
    expect(service.importSavedRecordset).not.toHaveBeenCalled();
  });

  it('expects "handleMenuItem" to handle import-saved-recordset', () => {
    const menuItem: any = { page: 'days-of-code', item: 'import-saved-recordset' };
    spyOn(service, 'menuItem').and.returnValue(menuItem);
    spyOn(service, 'exportBlankRecordset').and.stub();
    spyOn(service, 'exportCurrentRecordset').and.stub();
    spyOn(service, 'importSavedRecordset').and.stub();

    service.handleMenuItemEffect();
    expect(service.exportBlankRecordset).not.toHaveBeenCalled();
    expect(service.exportCurrentRecordset).not.toHaveBeenCalled();
    expect(service.importSavedRecordset).toHaveBeenCalled();
  });

  it('expects "generateBlank" to generate an empty structure (100 Days)', () => {
    const emptyStructure: Structure = service.generateBlank();
    expect(emptyStructure.useGoals).toEqual(true);
    expect(emptyStructure.useNotes).toEqual(true);
    expect(emptyStructure.days.length).toEqual(100);
    expect(emptyStructure.goals).toEqual([]);
  });

  it('expects "generateBlank" to generate an empty structure (365 Days)', () => {
    const days: number = 365;
    const emptyStructure: Structure = service.generateBlank(days);
    expect(emptyStructure.useGoals).toEqual(true);
    expect(emptyStructure.useNotes).toEqual(true);
    expect(emptyStructure.days.length).toEqual(days);
    expect(emptyStructure.goals).toEqual([]);
  });

  it('expects "loadStructure" to do nothing of not in local storage', async () => {
    spyOn(service.storage, 'getItem').and.resolveTo(null);
    spyOn(service.structureSignal, 'set').and.stub();

    await service.loadStructure();
    expect(service.structureSignal.set).not.toHaveBeenCalled();
  });

  it('expects "loadStructure" to trigger structure signal with stored structure', async () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [
        { number: 1, note: 'NOTE', done: false },
      ],
      goals: [
        { description: 'DESCRIPTION', done: false },
      ],
    };
    spyOn(service.storage, 'getItem').and.resolveTo(structure);
    spyOn(service.structureSignal, 'set').and.stub();

    await service.loadStructure();
    expect(service._structure).toEqual(structure);
    expect(service.structureSignal.set).toHaveBeenCalledWith(structure);
  });

  it('expects "storeStructure" to save it in local storage', async () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [
        { number: 1, note: 'NOTE', done: false },
      ],
      goals: [
        { description: 'DESCRIPTION', done: false },
      ],
    };
    spyOn(service.storage, 'setItem').and.stub();

    await service.storeStructure(structure);
    expect(service.storage.setItem).toHaveBeenCalledWith('dasy-of-code', 'job-squid--100-days', structure);
  });

  it('expects "structureChange" to store the new structure', () => {
    const structure: Structure = {
      useGoals: false,
      useNotes: false,
      days: [
        { number: 1, note: 'NOTE', done: false },
      ],
      goals: [
        { description: 'DESCRIPTION', done: false },
      ],
    };
    spyOn(service.structureSignal, 'set').and.stub();
    spyOn(service, 'storeStructure').and.stub();

    service.structureChange(structure);
    expect(service._structure).toEqual(structure);
    expect(service.structureSignal.set).toHaveBeenCalledWith(structure);
    expect(service.storeStructure).toHaveBeenCalledWith(structure);
  });

  it('expects "exportBlankRecordset" to trigger save with a blob and filename', () => {
    spyOn(service, 'saveAs').and.stub();

    service.exportBlankRecordset();
    expect(service.saveAs).toHaveBeenCalledWith(jasmine.any(Blob), 'blank-days-of-code.json');
  });

  it('expects "exportCurrentRecordset" to trigger save with a blob and filename', () => {
    spyOn(service, 'saveAs').and.stub();

    service.exportCurrentRecordset();
    expect(service.saveAs).toHaveBeenCalledWith(jasmine.any(Blob), 'current-days-of-code.json');
  });

  it('expects "importSavedRecordset" to set trigger import signal to active', () => {
    spyOn(service.triggerImportSignal, 'set').and.stub();

    service.importSavedRecordset();
    expect(service.triggerImportSignal.set).toHaveBeenCalledWith('active');
  });

  it('expects "clearTriggerImport" to set trigger import signal to inactive', () => {
    spyOn(service.triggerImportSignal, 'set').and.stub();

    service.clearTriggerImport();
    expect(service.triggerImportSignal.set).toHaveBeenCalledWith('inactive');
  });
});
