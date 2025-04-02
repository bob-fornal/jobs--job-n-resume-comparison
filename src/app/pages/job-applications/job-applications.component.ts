import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { JobApplication } from '../../core/interfaces/job-application';
import { Tag } from '../../core/interfaces/tag';

import { TaggingService } from '../../core/services/tagging.service';

@Component({
  selector: 'app-job-applications',
  standalone: false,
  
  templateUrl: './job-applications.component.html',
  styleUrl: './job-applications.component.css'
})
export class JobApplicationsComponent {
  readonly router = inject(Router);
  readonly taggingService = inject(TaggingService);

  tags: Array<Tag> = [];

  constructor() {
    this.init();
    effect(this.handleTags.bind(this));
  }

  init(): void {
    this.taggingService.getTags('job-applications');
  }

  handleTags(): void {
    const value: Array<Tag> = this.taggingService.signals['job-applications']();
    this.tags = value;
  }

  editTags = (): void => {
    this.router.navigateByUrl('/tag-management/job-applications')
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

  add(): void {
    this.router.navigateByUrl(`/job-applications/add`);
  }
}
