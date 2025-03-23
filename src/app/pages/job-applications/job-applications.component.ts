import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';

import jobTags from '../../core/constants/job-application.tags.json';

import { JobApplication } from '../../core/interfaces/job-application';
import { Tag } from '../../core/interfaces/tag';

import { JobApplicationsService } from './job-applications.service';

@Component({
  selector: 'app-job-applications',
  standalone: false,
  
  templateUrl: './job-applications.component.html',
  styleUrl: './job-applications.component.css'
})
export class JobApplicationsComponent {

  applications: Array<JobApplication> = [];

  tags: Array<Tag> = jobTags

  constructor(
    private router: Router,
    private service: JobApplicationsService,
  ) {
    effect(this.handleApplicationsEffect.bind(this));
  }

  handleApplicationsEffect = (): void => {
    const value: Array<JobApplication> = this.service.structure();
    this.applications = value;
  };

  editTracking = (index: number): void => {
    this.router.navigateByUrl(`job-applications/view-tracking/${index}`);
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

  getTagStyle = (tag: Tag): string => {
    return `--mdc-chip-elevated-container-color: ${tag.backgroundColor}; --color-light-foreground: ${tag.foregroundColor}; --mdc-chip-outline-color: ${tag.foregroundColor}; --mdc-chip-outline-width: 2px;`;
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
