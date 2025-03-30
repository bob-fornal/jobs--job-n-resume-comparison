import { Component, effect, inject, Input, signal } from '@angular/core';

import { JobApplicationsService } from '../job-applications.service';

import { JobActivity, JobApplication } from '../../../core/interfaces/job-application';
import { FilterSettings } from '../../../core/interfaces/filter-state.interface';

@Component({
  selector: 'applications-table',
  standalone: false,
  templateUrl: './applications-table.component.html',
  styleUrl: './applications-table.component.css'
})
export class ApplicationsTableComponent {
  readonly service = inject(JobApplicationsService);

  @Input() editTracking: any;
  @Input() navigate: any;
  @Input() delete: any;

  private _data: Array<JobApplication> = [];
  @Input() set data(value: Array<JobApplication>) {
    this._data = value;
    this.filteredApplications = value;
  }

  filteredApplications: Array<JobApplication> = this.data;
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
    showActiveApplications: true,
    showMostRecent: true,
  });

  constructor() {
    this.service.initFilterSettings();
    effect(this.handleFilterSettings.bind(this));
  }

  handleFilterSettings() {
    const settings = this.service.filterState();
    this.filterSettings.set(settings);

    const filtered: Array<JobApplication> = this._data.filter((item: JobApplication) => {
      if (item.active === settings.showActiveApplications) return true;
      return false;
    });
    this.filteredApplications = filtered;
    this.setMostRecent(settings.showMostRecent);
  }

  getDate(application: JobApplication): string {
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
    const value: boolean = state.showActiveApplications;
    state.showActiveApplications = !value;
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
  }

  getLastTrackingTagStyle(application: JobApplication): string {
    const tracking: JobActivity | null = application.tracking
      .reduce((a: JobActivity, b: JobActivity) => {
        return new Date(a.datetimestamp) > new Date(b.datetimestamp) ? a : b;
      });
    return `
      --mat-table-row-item-label-text-color: ${tracking.tag.foregroundColor};
      --mat-icon-color: ${tracking.tag.foregroundColor};
      background-color: ${tracking.tag.backgroundColor};
    `.replaceAll('  ', ' ');
  }
}
