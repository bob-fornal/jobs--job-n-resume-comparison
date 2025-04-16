import { effect, inject, Injectable, Signal, signal } from '@angular/core';

import saveAs from 'file-saver';

import { JobActivity, JobApplication } from '../../core/interfaces/job-application';

import { StorageLayerService } from '../../core/services/storage-layer.service';
import { FilterSettings, PagingSettings } from '../../core/interfaces/filter-state.interface';
import { UtilitiesService } from '../../core/services/utilities.service';
import { TopToolbarService } from '../../shared/top-toolbar/top-toolbar.service';
import { MenuItem } from '../../core/interfaces/menu-item.interface';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationsService {
  readonly utilities = inject(UtilitiesService);

  saveAs: any = saveAs;
  
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

  menuItem: any;

  constructor(
    private storage: StorageLayerService,
    private toolbarService: TopToolbarService,
  ) {
    this.menuItem = this.toolbarService.menuItem;
    effect(this.handleMenuItemEffect.bind(this));
  }

  public init = async (): Promise<void> => {
    if (this.initFired === false) {
      await this.loadFilterSettings();
      await this.loadApplications();
      await this.applyFilterAndPagingSettings();
      this.initFired = true;  
    }
  };

  handleMenuItemEffect = (): void => {
      const { page, item }: MenuItem = this.menuItem();
      if (page === 'job-applications') {
        switch (item) {
          case 'export-current-recordset':
            this.exportCurrentRecordset();
            break;
          case 'import-saved-recordset':
            this.importSavedRecordset();
            break;
        }
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
    return application || null;
  };

  private getArrayIndexOfApplication = (application: JobApplication): number => {
    const applications = [...this._applications];
    const arrayIndex: number = applications.findIndex((inner: JobApplication) => inner.index === application.index);
    return arrayIndex;
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
    const arrayIndex: number = this.getArrayIndexOfApplication(editing);
    applications[arrayIndex] = editing;
    this.saveApplications(applications);
  };

  public deleteApplication = async (deleting: JobApplication): Promise<void> => {
    const applications = [...this._applications];
    const arrayIndex: number = this.getArrayIndexOfApplication(deleting);
    applications.splice(arrayIndex, 1);
    this.saveApplications(applications);
  };

  public saveApplications = async (applications: Array<JobApplication>): Promise<void> => {
    const sorted: Array<JobApplication> = this.sortApplications(applications);
    this._applications = [...sorted];
    this.applicationsSignal.set(this._applications);
    await this.storage.setItem('job-applications', 'job-squid--job-applications', sorted);
    this.applyFilterAndPagingSettings();
  };

  private sortApplications = (applications: Array<JobApplication>): Array<JobApplication> => {
    applications.sort((a: JobApplication, b: JobApplication) => {
      if (a.active === b.active) return a.title.localeCompare(b.title);
      return a.active ? -1 : 1;
    });
    
    return this.sortTrackingActivities(applications);
  };

  private sortTrackingActivities = (applications: Array<JobApplication>): Array<JobApplication> => {
    return applications.map((application: JobApplication) => {
      application.tracking.sort((a: JobActivity, b: JobActivity) => {
        if (a.datetimestamp < b.datetimestamp) return 1;
        if (a.datetimestamp > b.datetimestamp) return -1;
        return 0;
      })
      return application;
    });
  };

  // Filter Settings
  private loadFilterSettings = async (): Promise<void> => {
    const settings: FilterSettings | null = await this.storage.getItem('job-applications', 'job-squid--filter-settings');
    if (settings === null) return;

    this._filterState = { ...settings };
    this.filterStateSignal.set(this._filterState);
  };

  private applyFilterAndPagingSettings = (): void => {
    let applications = [...this._applications];
    applications = this.sortOnMostRecentSetting(applications, this._filterState.showMostRecent);
    applications = this.filterOnActiveApplicationsOnlySetting(applications, this._filterState.showActiveApplicationsOnly);

    const pageApplications: Array<JobApplication> = this.setPageData(applications);
    this.pagingStateSignal.set(this._pagingState);
    this.applicationsSignal.set(pageApplications);
  };

  private sortOnMostRecentSetting = (applications: Array<JobApplication>, showMostRecent: boolean): Array<JobApplication> => {
    applications.sort((a: JobApplication, b: JobApplication) => {
      const aTimestamp: string = this.getTimestamp(a.tracking);
      const bTimestamp: string = this.getTimestamp(b.tracking);

      if (aTimestamp < bTimestamp) return showMostRecent ? 1 : -1;
      if (aTimestamp > bTimestamp) return showMostRecent ? -1 : 1;
      return 0;
    });
    return applications;
  };

  private filterOnActiveApplicationsOnlySetting = (
    applications: Array<JobApplication>,
    showActiveApplicationsOnly: boolean,
  ): Array<JobApplication> => {
    if (showActiveApplicationsOnly === false) return applications;
      
    return applications.filter((item: JobApplication) => {
      return item.active === true;
    });
  };

  private setPageData = (applications: Array<JobApplication>): Array<JobApplication> => {
    const totalPages: number = Math.ceil(applications.length / this._pagingState.recordsPerPage);
    this._pagingState.totalPages = totalPages;
    this._pagingState.totalRecords = applications.length;

    const startIndex: number = this._pagingState.pageIndex * this._pagingState.recordsPerPage;
    const endIndex: number = startIndex + this._pagingState.recordsPerPage;
    return applications.slice(startIndex, endIndex);
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

  // Import & Export
  exportCurrentRecordset = (): void => {
    const applications = this.applications();
    const currentRecorset: string = JSON.stringify(applications);
    const blob = new Blob([currentRecorset], { type: 'text/plain;charset=utf-8'});
    this.saveAs(blob, 'current-job-applications.json');
  };

  triggerImportSignal = signal('inactive');
  readonly triggerImport = this.triggerImportSignal.asReadonly();

  importSavedRecordset = (): void => {
    this.triggerImportSignal.set('active');
  };

  clearTriggerImport = (): void => {
    this.triggerImportSignal.set('inactive');
  };

  // Utilities
  private getTimestamp(tracking: Array<JobActivity>): string {
    if (tracking.length === 0) return this.utilities.toDatetimestamp(new Date());

    return tracking.reduce((a: JobActivity, b: JobActivity) => {
      return new Date(a.datetimestamp) > new Date(b.datetimestamp) ? a : b;
    }).datetimestamp;
  }
}
