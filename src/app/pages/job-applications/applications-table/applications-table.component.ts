import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, Input, signal } from '@angular/core';

import { JobApplicationsService } from '../job-applications.service';

import { JobActivity, JobApplication } from '../../../core/interfaces/job-application';
import { FilterSettings } from '../../../core/interfaces/filter-state.interface';
import { UtilitiesService } from '../../../core/services/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'applications-table',
  standalone: false,
  templateUrl: './applications-table.component.html',
  styleUrl: './applications-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsTableComponent {
  readonly changeRef = inject(ChangeDetectorRef);
  readonly router = inject(Router);
  readonly service = inject(JobApplicationsService);
  readonly utilities = inject(UtilitiesService);

  public applications: Array<JobApplication> = [];
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

  filterSettings = {
    showActiveApplicationsOnly: false,
    showMostRecent: true,
  };

  constructor() {
    this.init();
    effect(this.handleApplicationsChange.bind(this));
    effect(this.handleFilterSettings.bind(this));
  }

  async init() {
    await this.service.init();
  }

  handleApplicationsChange() {
    this.applications = this.service.applications();
    this.changeRef.detectChanges();
  }

  handleFilterSettings() {
    const settings = this.service.filterState();
    this.filterSettings = { ...settings };
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

  toggleActiveApplications = this.service.toggleActiveApplications.bind(this.service);
  toggleMostRecent = this.service.toggleMostRecent.bind(this.service);

  getDateTitle(): string {
    const state: FilterSettings = this.service.filterState();
    return state.showMostRecent === true ? 'newest' : 'oldest'
  }

  getLastTrackingTagStyle(application: JobApplication): string {
    const applicationTracking: Array<JobActivity> = application.tracking.filter((track: JobActivity) => track.tag!.title !== 'Creation');
    const tracking: JobActivity = applicationTracking.length === 0
      ? { datetimestamp: '', description: '', tag: {
            title: 'Creation',
            backgroundColor: '#f0efef',
            foregroundColor: '#000011',
            original: true,
            showInModal: false,
          }
        }
      : applicationTracking.reduce((a: JobActivity, b: JobActivity) => {
          return new Date(a.datetimestamp) > new Date(b.datetimestamp) ? a : b;
        });

    return [
      `--mat-table-row-item-label-text-color: ${ tracking.tag!.foregroundColor };`,
      `--mat-icon-color: ${ tracking.tag!.foregroundColor };`,
      `background-color: ${ tracking.tag!.backgroundColor };`,
    ].join(' ');
  }

  edit(application: JobApplication): void {
    this.router.navigateByUrl(`/job-applications/edit/${application.index!}`);
  };

  editTracking = (application: JobApplication): void => {
    this.router.navigateByUrl(`/job-applications/view-tracking/${application.index!}`);
  };

  delete = (application: JobApplication): void => {
    this.service.deleteApplication(application);
  };
}
