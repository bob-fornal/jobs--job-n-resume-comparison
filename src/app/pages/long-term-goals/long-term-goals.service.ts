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
    // await this.loadGoals();
  };

  handleMenuItemEffect = (): void => {
    const { page, item } = this.menuItem();
    if (page === 'long-term-goals') {
      // TODO
    }
  };

  loadGoals = async () => {
    const data: Array<LongTermGoal> | null = await this.storage.getItem('long-term-goals', 'job-squid--long-term-goals');
    if (data === null) return;

    this._structure = [...data];
    this.structureSignal.set(this._structure);
  };

}
