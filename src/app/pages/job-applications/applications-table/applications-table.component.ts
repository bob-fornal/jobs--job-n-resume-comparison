import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, Input, signal } from '@angular/core';

import { JobApplicationsService } from '../job-applications.service';

import { JobActivity, JobApplication } from '../../../core/interfaces/job-application';
import { FilterSettings } from '../../../core/interfaces/filter-state.interface';
import { UtilitiesService } from '../../../core/services/utilities.service';

@Component({
  selector: 'applications-table',
  standalone: false,
  templateUrl: './applications-table.component.html',
  styleUrl: './applications-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsTableComponent {
  readonly service = inject(JobApplicationsService);
  readonly utilities = inject(UtilitiesService);

  @Input() editTracking: any;
  @Input() navigate: any;
  @Input() delete: any;

  private _data: Array<JobApplication> = [];
  @Input() set data(value: Array<JobApplication>) {
    this._data = value;
    this.filteredApplications = value;
    this.pagedApplications = value;
  }

  filteredApplications: Array<JobApplication> = this.data;
  pagedApplications: Array<JobApplication> = this.data;
  date: { title: string; showMostRecent: boolean; } = {
    title: 'Date Applied',
    showMostRecent: true,
  };

  displayedColumns: Array<string> = [
    'company',
    'title',
    'status',
    'date',
    'actions',
  ];

  filterSettings = signal<FilterSettings>({
    showActiveApplicationsOnly: true,
    showMostRecent: true,
  });

  private intialLoad = true;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.service.initFilterSettings();
    effect(this.handleFilterSettings.bind(this));
  }

  handleFilterSettings() {
    const settings = this.service.filterState();
    this.filterSettings.set(settings);
    this.adjustForFilterSettings();
  }

  adjustForFilterSettings(triggerSetMostRecent = true): void {
    const settings = this.filterSettings();
    console.log(settings);

    let applications = this.service.structure();
    applications.sort((a: JobApplication, b: JobApplication) => {
      const aTimestamp: string = this.getTimestamp(a.tracking);
      const bTimestamp: string = this.getTimestamp(b.tracking);

      if (aTimestamp < bTimestamp) return settings.showMostRecent ? 1 : -1;
      if (aTimestamp > bTimestamp) return settings.showMostRecent ? -1 : 1;
      return 0;
    });
    console.log(JSON.parse(JSON.stringify(applications)));

    if (settings.showActiveApplicationsOnly === true) {
      applications = applications.filter((item: JobApplication) => {
        if (settings.showActiveApplicationsOnly === true) return item.active === true;
        return true;
      });
    }
    if (triggerSetMostRecent === true) {
      this.setMostRecent(settings.showMostRecent);
    }
    this.filteredApplications = [...applications];
  }

  getTimestamp(tracking: Array<JobActivity>): string {
    if (tracking.length === 0) return this.utilities.toDatetimestamp(new Date());

    return tracking.reduce((a: JobActivity, b: JobActivity) => {
      return new Date(a.datetimestamp) > new Date(b.datetimestamp) ? a : b;
    }).datetimestamp;
  }

  handlePageChange(pageData: Array<JobApplication>): void {
    if (this.intialLoad === true) {
      this.intialLoad = false;
      return;
    }

    this.pagedApplications = pageData;
    this.changeDetectorRef.detectChanges();
  }

  getDate(application: JobApplication): string {
    if (application.tracking.length === 0) return '';
    const tracking: JobActivity | null = application.tracking
      .reduce((a: JobActivity, b: JobActivity) => {
        if (this.date.showMostRecent === true) {
          return new Date(a.datetimestamp) > new Date(b.datetimestamp) ? a : b;
        } else {
          return new Date(a.datetimestamp) < new Date(b.datetimestamp) ? a : b;
        }
      });
    return tracking.datetimestamp;
  }


  toggleActiveApplications(): void {
    const state: FilterSettings = this.filterSettings();
    const value: boolean = state.showActiveApplicationsOnly;
    state.showActiveApplicationsOnly = !value;
    this.service.saveFilterSettings(state);
  }

  toggleMostRecent(): void {
    const state: FilterSettings = this.filterSettings();
    const value: boolean = state.showMostRecent;
    state.showMostRecent = !value;
    this.service.saveFilterSettings(state);
    this.setMostRecent(state.showMostRecent);
  }

  setMostRecent(check: boolean): void {
    this.date = check === true
    ? {
        title: 'Most Recent (newest)',
        showMostRecent: true,
      }
    : {
        title: 'Date Applied (oldest)',
        showMostRecent: false,
      };
    this.adjustForFilterSettings(false);
  }


  getLastTrackingTagStyle(application: JobApplication): string {
    const tracking: JobActivity | null = application.tracking.length === 0
      ? { datetimestamp: '', description: '' }
      : application.tracking.reduce((a: JobActivity, b: JobActivity) => {
          return new Date(a.datetimestamp) > new Date(b.datetimestamp) ? a : b;
        });
    return `
      --mat-table-row-item-label-text-color: ${ tracking.tag?.foregroundColor || '#000000' };
      --mat-icon-color: ${ tracking.tag?.foregroundColor || '#000000' };
      background-color: ${ tracking.tag?.backgroundColor || '#ffffff' };
    `.replaceAll('  ', ' ');
  }
}
