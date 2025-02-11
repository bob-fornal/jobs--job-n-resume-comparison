import { effect, Injectable, Signal, signal } from '@angular/core';

import { saveAs } from 'file-saver';

import { StorageClassAbstraction } from '../../core/services/storage-class-abstraction.abstract';
import { Structure } from '../../core/interfaces/strucuture.interface';

import { TopToolbarService } from '../../shared/top-toolbar/top-toolbar.service';

@Injectable({
  providedIn: 'root'
})
export class DaysOfCodeService extends StorageClassAbstraction {

  saveAs: any = saveAs;

  _structure: Structure = this.generateBlank();
  structureSignal = signal(this._structure);
  readonly structure: Signal<Structure> = this.structureSignal.asReadonly();

  viewGoals: any;
  menuItem: any;

  constructor(
    private toolbarService: TopToolbarService,
  ) {
    super();

    this.loadStructure();

    this.viewGoals = this.toolbarService.viewGoals;
    effect(this.handleViewGoalsEffect.bind(this));

    this.menuItem = this.toolbarService.menuItem;
    effect(this.handleMenuItemEffect.bind(this));
  }

  handleViewGoalsEffect = (): void => {
    const value: boolean = this.viewGoals();
    this._structure.useGoals = value;
    this.storeStructure(this._structure);
    this.loadStructure();
  };

  handleMenuItemEffect = (): void => {
    const { page, item }: { page: string, item: string } = this.menuItem();
    if (page === 'days-of-code') {
      switch (item) {
        case 'export-blank-recordset':
          this.exportBlankRecordset();
          break;
        case 'export-current-recordset':
          this.exportCurrentRecordset();
          break;
        case 'import-saved-recordset':
          this.importSavedRecordset();
          break;
      }
    }
  };

  generateBlank (numberOfDays: number = 100): Structure {
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [],
      goals: []
    };
    for (let i = 0, len = numberOfDays; i < len; i++) {
      structure.days.push({ number: i + 1, note: '', done: false });
    }
    return structure;
  }

  loadStructure = (): void => {
    const dataString: string | null = this.localstorage.getItem('job-squid--100-days');
    if (dataString === null) return;

    const data: Structure = JSON.parse(dataString);
    this._structure = { ...data };
    this.structureSignal.set(this._structure);
  };

  storeStructure = (structure: Structure): void => {
    this.localstorage.setItem('job-squid--100-days', JSON.stringify(structure));
  };

  structureChange = (newStructure: Structure): void => {
    this._structure = { ...newStructure };
    this.structureSignal.set(this._structure);
    this.storeStructure(this._structure);
  };

  exportBlankRecordset = (): void => {
    const blankRecordset: string = JSON.stringify(this.generateBlank());
    const blob = new Blob([blankRecordset], { type: 'text/plain;charset=utf-8'});
    this.saveAs(blob, 'blank-days-of-code.json');
  };

  exportCurrentRecordset = (): void => {
    const currentRecorset: string = JSON.stringify(this._structure);
    const blob = new Blob([currentRecorset], { type: 'text/plain;charset=utf-8'});
    this.saveAs(blob, 'current-days-of-code.json');
  };

  triggerImportSignal = signal('inactive');
  readonly triggerImport = this.triggerImportSignal.asReadonly();

  importSavedRecordset = (): void => {
    this.triggerImportSignal.set('active');
  };

  clearTriggerImport = (): void => {
    this.triggerImportSignal.set('inactive');
  };
}
