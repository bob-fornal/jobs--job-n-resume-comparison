import { Component } from '@angular/core';

import jobTags from '../../core/constants/job-application.tags.json';

import { JobApplication } from '../../core/interfaces/job-application';
import { Tag } from '../../core/interfaces/tag';

@Component({
  selector: 'app-job-applications',
  standalone: false,
  
  templateUrl: './job-applications.component.html',
  styleUrl: './job-applications.component.css'
})
export class JobApplicationsComponent {

  applications: Array<JobApplication> = [];

  tags: Array<Tag> = jobTags

  navigate = (type: string): void => {
    // TODO
  };

  getTagStyle = (tag: Tag): string => {
    return `--mdc-chip-elevated-container-color: ${tag.backgroundColor}; --color-light-foreground: ${tag.foregroundColor}; --mdc-chip-outline-color: ${tag.foregroundColor}; --mdc-chip-outline-width: 2px;`;
  };
}
