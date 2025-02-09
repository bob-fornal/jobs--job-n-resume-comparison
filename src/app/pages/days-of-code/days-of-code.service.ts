import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StorageClassAbstraction } from '../../core/services/storage-class-abstraction.abstract';
import { Structure } from '../../core/interfaces/strucuture.interface';

@Injectable({
  providedIn: 'root'
})
export class DaysOfCodeService extends StorageClassAbstraction {

  _structure: Structure = this.generateBlank();
  structure: BehaviorSubject<Structure> = new BehaviorSubject<Structure>(this._structure);

  constructor() {
    super();

    this.loadStructure();
  }

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
    this.structure.next(this._structure);
  };

  storeStructure = (structure: Structure): void => {
    this.localstorage.setItem('job-squid--100-days', JSON.stringify(structure));
  };

  structureChange = (newStructure: Structure): void => {
    this._structure = { ...newStructure };
    this.structure.next(this._structure);
    this.storeStructure(this._structure);
  };
}
