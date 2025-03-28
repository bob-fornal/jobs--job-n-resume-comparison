import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { JobApplication } from '../../core/interfaces/job-application';
import { Tag } from '../../core/interfaces/tag';

import { JobApplicationsService } from './job-applications.service';
import { TaggingService } from '../../core/services/tagging.service';

@Component({
  selector: 'app-job-applications',
  standalone: false,
  
  templateUrl: './job-applications.component.html',
  styleUrl: './job-applications.component.css'
})
export class JobApplicationsComponent {
  readonly router = inject(Router);
  readonly service = inject(JobApplicationsService);
  readonly taggingService = inject(TaggingService);

  applications: Array<JobApplication> = [];

  tags: Array<Tag> = [];

  constructor() {
    this.init();
    effect(this.handleApplicationsEffect.bind(this));
    effect(this.handleTags.bind(this));
  }

  init(): void {
    this.taggingService.getTags('job-applications');
  }

  handleApplicationsEffect = (): void => {
    const value: Array<JobApplication> = this.service.structure();
    this.applications = value;
  };

  handleTags(): void {
    const value: Array<Tag> = this.taggingService.signals['job-applications']();
    this.tags = value;
  }

  editTracking = (index: number): void => {
    this.router.navigateByUrl(`/job-applications/view-tracking/${index}`);
  };

  editTags = (): void => {
    this.router.navigateByUrl('/tag-management/job-applications')
  };

  navigate = (to: string, data: number | null = null): void => {
    if (data === null) {
      this.router.navigateByUrl(`/job-applications/${to}`);
    } else {
      this.router.navigateByUrl(`/job-applications/${to}/${data}`);
    }
  };

  delete = (index: number): void => {
    const applications: Array<JobApplication> = [...this.applications];
    applications.splice(index, 1);
    this.service.saveApplications(applications);
  };

  getTagStyle(tag: Tag, reverse = false): string {
    if (reverse === false) {
      return `--mdc-chip-elevated-container-color: ${tag.backgroundColor}; --mdc-chip-label-text-color: ${tag.foregroundColor}; --mdc-chip-outline-color: ${tag.foregroundColor}; --mdc-chip-outline-width: 2px;`;
    } else {
      return `--mdc-chip-elevated-container-color: ${tag.backgroundColor}; --mdc-chip-label-text-color: ${tag.foregroundColor}; --mdc-chip-outline-color: ${tag.foregroundColor}; --mdc-chip-outline-width: 2px;`;
    }
  };

  getCardColor = (application: JobApplication): string => {
    const classes: Array<string> = ['base-card whole-card'];
    if (application.active === false) {
      classes.push('inactive');
    } else {
      classes.push('active');
    }
    if (application.tracking.length === 0) classes.push('no-tracking');

    return classes.join(' ');
  };

  getTitleCompany = (application: JobApplication): string => {
    return `${application.company} (${application.title})`;
  };
}
