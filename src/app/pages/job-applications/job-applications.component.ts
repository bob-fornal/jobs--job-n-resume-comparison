import { Component } from '@angular/core';

import jobTags from '../../core/constants/job-application.tags.json';

import { JobApplication } from '../../core/interfaces/job-application';
import { Tag } from '../../core/interfaces/tag';
import { Router } from '@angular/router';

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
  ) {}

  navigate = (to: string, data: number | null = null): void => {
    if (data === null) {
      this.router.navigateByUrl(`/job-applications/${to}`);
    } else {
      this.router.navigateByUrl(`/job-applications/${to}/${data}`);
    }
  };

  getTagStyle = (tag: Tag): string => {
    return `--mdc-chip-elevated-container-color: ${tag.backgroundColor}; --color-light-foreground: ${tag.foregroundColor}; --mdc-chip-outline-color: ${tag.foregroundColor}; --mdc-chip-outline-width: 2px;`;
  };
}
