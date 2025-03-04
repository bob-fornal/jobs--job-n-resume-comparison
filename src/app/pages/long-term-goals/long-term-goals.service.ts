import { effect, Injectable, Signal, signal } from '@angular/core';

import { StorageLayerService } from '../../core/services/storage-layer.service';
import { TopToolbarService } from '../../shared/top-toolbar/top-toolbar.service';

import { LongTermGoal } from '../../core/interfaces/structure-goals.interface';

@Injectable({
  providedIn: 'root'
})
export class LongTermGoalsService {
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
      // TODO
    }
  };

  loadGoals = async (): Promise<void> => {
    const goals: Array<LongTermGoal> | null = await this.storage.getItem('long-term-goals', 'job-squid--long-term-goals');
    if (goals === null) return;

    goals.sort((a: LongTermGoal, b: LongTermGoal) => {
      if (a.active === b.active) {
        return a.title.localeCompare(b.title);
      }
      return a.active ? -1 : 1;
    });

    this._structure = [...goals];
    this.structureSignal.set(this._structure);
  };

  saveGoals = async (goals: Array<LongTermGoal>): Promise<void> => {
    this._structure = [...goals];
    this.structureSignal.set(this._structure);
    await this.storage.setItem('long-term-goals', 'job-squid--long-term-goals', goals);
  };
}
