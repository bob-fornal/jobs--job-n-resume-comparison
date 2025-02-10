import { effect, Injectable, Signal, signal } from '@angular/core';

import { StorageClassAbstraction } from '../../core/services/storage-class-abstraction.abstract';
import { Structure } from '../../core/interfaces/strucuture.interface';

import { TopToolbarService } from '../../shared/top-toolbar/top-toolbar.service';

@Injectable({
  providedIn: 'root'
})
export class DaysOfCodeService extends StorageClassAbstraction {

  _structure: Structure = this.generateBlank();
  structureSignal = signal(this._structure);
  readonly structure: Signal<Structure> = this.structureSignal.asReadonly();

  viewGoals: any;

  constructor(
    private toolbarService: TopToolbarService,
  ) {
    super();

    this.loadStructure();

    this.viewGoals = this.toolbarService.viewGoals;
    effect(this.handleViewGoalsEffect.bind(this));
  }

  handleViewGoalsEffect = (): void => {
    const value: boolean = this.viewGoals();
    this._structure.useGoals = value;
    this.storeStructure(this._structure);
    this.loadStructure();
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

  loadStructure = () => {
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
}
