import { inject, Injectable, Signal, signal } from '@angular/core';

import { JobActivity, JobApplication } from '../../core/interfaces/job-application';

import { StorageLayerService } from '../../core/services/storage-layer.service';
import { FilterSettings, PagingSettings } from '../../core/interfaces/filter-state.interface';
import { UtilitiesService } from '../../core/services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationsService {
  readonly utilities = inject(UtilitiesService);

  public initFired = false;
  private nextIndex = 0;

  private _applications: Array<JobApplication> = [];
  private applicationsSignal = signal(this._applications);
  readonly applications: Signal<Array<JobApplication>> = this.applicationsSignal.asReadonly();

  private _filterState: FilterSettings = {
    showActiveApplicationsOnly: true,
    showMostRecent: true,
  };
  private filterStateSignal = signal(this._filterState);
  readonly filterState: Signal<FilterSettings> = this.filterStateSignal.asReadonly();

  private _pagingState: PagingSettings = {
    pageIndex: 0,
    recordsPerPage: 50,
    totalPages: 0,
    totalRecords: 0,
  };
  private pagingStateSignal = signal(this._pagingState);
  readonly pagingState: Signal<PagingSettings> = this.pagingStateSignal.asReadonly();

  constructor(
    private storage: StorageLayerService,
  ) {}

  public init = async (): Promise<void> => {
    if (this.initFired === false) {
      await this.loadFilterSettings();
      await this.loadApplications();
      await this.applyFilterAndPagingSettings();
      this.initFired = true;  
    }
  };

  private loadApplications = async (): Promise<void> => {
    const applications: Array<JobApplication> | null = await this.storage.getItem('job-applications', 'job-squid--job-applications');
    if (applications === null) return;
    this._applications = [...applications];

    applications.forEach((application: JobApplication) => {
      if (application.index! > this.nextIndex) this.nextIndex = application.index!;
    });
    this.nextIndex++;
  };

  public getApplicationByIndex = (index: number): JobApplication | null => {
    const application = this._applications.find((application: JobApplication) => application.index === index);
    console.log(this._applications, application);
    return application || null;
  };

  public saveNewApplication = async (adding: JobApplication): Promise<void> => {
    adding.index = this.nextIndex;
    this.nextIndex++;

    const applications = [...this._applications];
    applications.push(adding);
    this.saveApplications(applications);
  };

  public saveApplication = async (editing: JobApplication): Promise<void> => {
    const applications = [...this._applications];
    const index: number = applications.findIndex((application: JobApplication) => application.index === editing.index);
    applications[index] = editing;
    this.saveApplications(applications);
  };

  public deleteApplication = async (deleting: JobApplication): Promise<void> => {
    const applications = [...this._applications];
    applications.splice(deleting.index!, 1);
    this.saveApplications(applications);
  };

  private saveApplications = async(applications: Array<JobApplication>): Promise<void> => {
    applications.sort((a: JobApplication, b: JobApplication) => {
      if (a.active === b.active) {
        return a.title.localeCompare(b.title);
      }
      return a.active ? -1 : 1;
    });

    applications = applications.map((application: JobApplication) => {
      application.tracking.sort((a: JobActivity, b: JobActivity) => {
        if (a.datetimestamp < b.datetimestamp) return 1;
        if (a.datetimestamp > b.datetimestamp) return -1;
        return 0;
      })
      return application;
    });

    this._applications = [...applications];
    this.applicationsSignal.set(this._applications);
    await this.storage.setItem('job-applications', 'job-squid--job-applications', applications);
    this.applyFilterAndPagingSettings();
  };

  // Filter Settings
  private loadFilterSettings = async (): Promise<void> => {
    const settings: FilterSettings | null = await this.storage.getItem('job-applications', 'job-squid--filter-settings');
    if (settings === null) return;

    this._filterState = { ...settings };
    this.filterStateSignal.set(this._filterState);
  };

  private applyFilterAndPagingSettings = async (): Promise<void> => {
    let applications = [...this._applications];
    applications.sort((a: JobApplication, b: JobApplication) => {
      const aTimestamp: string = this.getTimestamp(a.tracking);
      const bTimestamp: string = this.getTimestamp(b.tracking);

      if (aTimestamp < bTimestamp) return this._filterState.showMostRecent ? 1 : -1;
      if (aTimestamp > bTimestamp) return this._filterState.showMostRecent ? -1 : 1;
      return 0;
    });

    if (this._filterState.showActiveApplicationsOnly === true) {
      applications = applications.filter((item: JobApplication) => {
        if (this._filterState.showActiveApplicationsOnly === true) return item.active === true;
        return true;
      });
    }

    const totalPages: number = Math.ceil(applications.length / this._pagingState.recordsPerPage);
    this._pagingState.totalPages = totalPages;
    this._pagingState.totalRecords = applications.length;

    const startIndex: number = this._pagingState.pageIndex * this._pagingState.recordsPerPage;
    const endIndex: number = startIndex + this._pagingState.recordsPerPage;
    const pageApplications: Array<JobApplication> = applications.slice(startIndex, endIndex);

    this.pagingStateSignal.set(this._pagingState);
    this.applicationsSignal.set(pageApplications);
  };

  public saveFilterSettings = async (settings: FilterSettings): Promise<void> => {
    this._filterState = {...settings};
    this.filterStateSignal.set(this._filterState);

    await this.storage.setItem('job-applications', 'job-squid--filter-settings', settings);
    await this.applyFilterAndPagingSettings();
  };

  public toggleActiveApplications(): void {
    const state: FilterSettings = { ...this._filterState };
    const value: boolean = state.showActiveApplicationsOnly;
    state.showActiveApplicationsOnly = !value;
    this.saveFilterSettings(state);
  }

  public toggleMostRecent(): void {
    const state: FilterSettings = { ...this._filterState };
    const value: boolean = state.showMostRecent;
    state.showMostRecent = !value;
    this.saveFilterSettings(state);
  }

  // Paging Code
  public async toNextPage(): Promise<void> {
    const updated = { ...this._pagingState };
    updated.pageIndex++;
    this._pagingState = updated;
    this.pagingStateSignal.set(updated);
    await this.applyFilterAndPagingSettings();
  };

  public async toLastPage(): Promise<void> {
    const updated = { ...this._pagingState };
    updated.pageIndex = updated.totalPages - 1;
    this._pagingState = updated;
    this.pagingStateSignal.set(updated);
    await this.applyFilterAndPagingSettings();
  };

  public async toPreviousPage(): Promise<void> {
    const updated = { ...this._pagingState };
    updated.pageIndex--;
    this._pagingState = updated;
    this.pagingStateSignal.set(updated);
    await this.applyFilterAndPagingSettings();
  };

  public async toFirstPage(): Promise<void> {
    const updated = { ...this._pagingState };
    updated.pageIndex = 0;
    this._pagingState = updated;
    this.pagingStateSignal.set(updated);
    await this.applyFilterAndPagingSettings();
  };

  // Utilities
  private getTimestamp(tracking: Array<JobActivity>): string {
    if (tracking.length === 0) return this.utilities.toDatetimestamp(new Date());

    return tracking.reduce((a: JobActivity, b: JobActivity) => {
      return new Date(a.datetimestamp) > new Date(b.datetimestamp) ? a : b;
    }).datetimestamp;
  }
}
