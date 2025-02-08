import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ResumeDetails } from '../../core/interfaces/resume-details.interface';
import { Structure } from '../interfaces/strucuture.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localstorage: any = window.localStorage;

  resumes: BehaviorSubject<Array<ResumeDetails>> = new BehaviorSubject<Array<ResumeDetails>>([]);

  _structure: Structure = this.generateBlank();
  structure: BehaviorSubject<Structure> = new BehaviorSubject<Structure>(this._structure);

  constructor() {
    this.loadStructure();
    console.log('loading structure fired');
  }

  getDarkMode = (): boolean => {
    const mode = this.localstorage.getItem('job-squid--dark-mode');
    if (mode === null) {
      this.localstorage.setItem('job-squid--dark-mode', 'false');
      return false;
    } else {
      return mode === 'true';
    }
  };

  setDarkMode = (mode: boolean): void => {
    const modeString: string = JSON.stringify(mode);
    this.localstorage.setItem('job-squid--dark-mode', modeString);
  };

  getResumes = (): void => {
    const resumes = this.localstorage.getItem('job-squid--resumes');
    if (resumes === null) {
      this.localstorage.setItem('job-squid--resumes', '[]');
      this.resumes.next([]);
    } else {
      const items: Array<ResumeDetails> = JSON.parse(resumes);
      this.resumes.next(items);
    }
  };

  setResumes = (resumes: Array<ResumeDetails>): void => {
    const sortedResumes: Array<ResumeDetails> = resumes.sort((a: ResumeDetails, b: ResumeDetails) => a.name.localeCompare(b.name));

    const resumesString: string = JSON.stringify(sortedResumes);
    this.localstorage.setItem('job-squid--resumes', resumesString);
    this.getResumes();
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
