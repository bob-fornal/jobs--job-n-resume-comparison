import { Injectable, Signal, signal } from '@angular/core';

import { JobActivity, JobApplication } from '../../core/interfaces/job-application';

import { StorageLayerService } from '../../core/services/storage-layer.service';
import { FilterSettings } from '../../core/interfaces/filter-state.interface';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationsService {

  _structure: Array<JobApplication> = [];
  structureSignal = signal(this._structure);
  readonly structure: Signal<Array<JobApplication>> = this.structureSignal.asReadonly();

  _filterState: FilterSettings = {
    showActiveApplicationsOnly: true,
    showMostRecent: true,
  };
  filterStateSignal = signal(this._filterState);
  readonly filterState: Signal<FilterSettings> = this.filterStateSignal.asReadonly();

  constructor(
    private storage: StorageLayerService,
  ) {
    this.init();
  }

  init = async (): Promise<void> => {
    await this.loadApplications();
  };

  loadApplications = async (): Promise<void> => {
    const applications: Array<JobApplication> | null = await this.storage.getItem('job-applications', 'job-squid--job-applications');
    if (applications === null) return;
    this._structure = [...applications];
    this.structureSignal.set(this._structure);
  };

  saveApplications = async(applications: Array<JobApplication>): Promise<void> => {
    applications.sort((a: JobApplication, b: JobApplication) => {
      if (a.active === b.active) {
        return a.title.localeCompare(b.title);
      }
      return a.active ? -1 : 1;
    });

    this._structure = [...applications];
    this.structureSignal.set(this._structure);
    await this.storage.setItem('job-applications', 'job-squid--job-applications', applications);
  };

  // Filter Settings
  initFilterSettings = async (): Promise<void> => {
    await this.loadFilterSettings();
  };

  loadFilterSettings = async (): Promise<void> => {
    const settings: FilterSettings | null = await this.storage.getItem('job-applications', 'job-squid--filter-settings');
    if (settings === null) return;

    this._filterState = {...settings};
    this.filterStateSignal.set(this._filterState);
  };

  saveFilterSettings = async(settings: FilterSettings): Promise<void> => {
    this._filterState = {...settings};
    this.filterStateSignal.set(this._filterState);
    await this.storage.setItem('job-applications', 'job-squid--filter-settings', settings);
  };
}
