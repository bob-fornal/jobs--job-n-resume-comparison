import { effect, Injectable, Signal, signal } from '@angular/core';
import saveAs from 'file-saver';

import { StorageLayerService } from '../../core/services/storage-layer.service';
import { TopToolbarService } from '../../shared/top-toolbar/top-toolbar.service';

import { LongTermGoal } from '../../core/interfaces/structure-goals.interface';

@Injectable({
  providedIn: 'root'
})
export class LongTermGoalsService {
  
  saveAs: any = saveAs;

  _structure: Array<LongTermGoal> = [];
  structureSignal = signal(this._structure);
  readonly structure: Signal<Array<LongTermGoal>> = this.structureSignal.asReadonly();
  
  menuItem: any;

  constructor(
    private storage: StorageLayerService,
    private toolbarService: TopToolbarService,
  ) {
    this.init();

    this.menuItem = this.toolbarService.menuItem;
    effect(this.handleMenuItemEffect.bind(this));
  }

  init = async (): Promise<void> => {
    await this.loadGoals();
  };

  handleMenuItemEffect = (): void => {
    const { page, item } = this.menuItem();
    if (page === 'long-term-goals') {
      switch (item) {
        case 'export-current-long-term-goals':
          this.exportLongTermGoals();
          break;
        case 'import-saved-long-term-goals':
          this.importLongTermGoals();
          break;
      }
    }
  };

  loadGoals = async (): Promise<void> => {
    const goals: Array<LongTermGoal> | null = await this.storage.getItem('long-term-goals', 'job-squid--long-term-goals');
    if (goals === null) return;

    this._structure = [...goals];
    this.structureSignal.set(this._structure);
  };

  saveGoals = async (goals: Array<LongTermGoal>): Promise<void> => {
    goals.sort((a: LongTermGoal, b: LongTermGoal) => {
      if (a.active === b.active) {
        return a.title.localeCompare(b.title);
      }
      return a.active ? -1 : 1;
    });

    this._structure = [...goals];
    this.structureSignal.set(this._structure);
    await this.storage.setItem('long-term-goals', 'job-squid--long-term-goals', goals);
  };

  exportLongTermGoals = (): void => {
    const goals = this.structure();
    const currentRecorset: string = JSON.stringify(goals);
    const blob = new Blob([currentRecorset], { type: 'text/plain;charset=utf-8'});
    this.saveAs(blob, 'current-long-term-goals.json');
  };

  triggerImportSignal = signal('inactive');
  readonly triggerImport = this.triggerImportSignal.asReadonly();

  importLongTermGoals = (): void => {
    this.triggerImportSignal.set('active');
  };

  clearTriggerImport = (): void => {
    this.triggerImportSignal.set('inactive');
  };
}
