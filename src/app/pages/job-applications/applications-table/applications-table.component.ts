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

  displayedColumns: Array<string> = [
    'company',
    'title',
    'status',
    'actions',
  ];

  filterSettings = signal<FilterSettings>({
    showActiveApplications: true,
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
  }

  toggleActiveApplications(): void {
    const state: FilterSettings = this.filterSettings();
    const value: boolean = state.showActiveApplications;
    state.showActiveApplications = !value;
    this.service.saveFilterSettings(state);
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
