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

  it('expects "loadStructure" to do nothing of not in local storage', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue(null);
    spyOn(service.structureSignal, 'set').and.stub();

    service.loadStructure();
    expect(service.structureSignal.set).not.toHaveBeenCalled();
  });

  it('expects "loadStructure" to trigger structure signal with stored structure', () => {
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
    const structureString: string = JSON.stringify(structure);
    spyOn(service.localstorage, 'getItem').and.returnValue(structureString);
    spyOn(service.structureSignal, 'set').and.stub();

    service.loadStructure();
    expect(service._structure).toEqual(structure);
    expect(service.structureSignal.set).toHaveBeenCalledWith(structure);
  });

  it('expects "storeStructure" to save it in local storage', () => {
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
    const structureString: string = JSON.stringify(structure);
    spyOn(service.localstorage, 'setItem').and.stub;

    service.storeStructure(structure);
    expect(service.localstorage.setItem).toHaveBeenCalledWith('job-squid--100-days', structureString);
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
});
