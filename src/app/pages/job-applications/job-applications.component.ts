import { Component } from '@angular/core';

import { JobApplication } from '../../core/interfaces/job-application';

@Component({
  selector: 'app-job-applications',
  standalone: false,
  
  templateUrl: './job-applications.component.html',
  styleUrl: './job-applications.component.css'
})
export class JobApplicationsComponent {

  applications: Array<JobApplication> = [];

  navigate = (type: string): void => {
    // TODO
  };
}
