import { Component, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { JobApplicationsService } from '../job-applications.service';
import { JobApplication } from '../../../core/interfaces/job-application';

@Component({
  selector: 'app-ja-view-tracking',
  standalone: false,
  
  templateUrl: './ja-view-tracking.component.html',
  styleUrl: './ja-view-tracking.component.css'
})
export class JAViewTrackingComponent {
  index = -1;

  application: JobApplication | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: JobApplicationsService,
  ) {
    effect(this.handleApplicationsEffect.bind(this));
  }

  handleApplicationsEffect = (): void => {
    this.index = +this.activatedRoute.snapshot.params['index'];
    if (this.index > -1) {
      const applications: Array<JobApplication> = this.service.structure();
      this.application = applications[this.index];
      console.log(this.application);
    }
  };

  back = (): void => {
    this.router.navigateByUrl('/job-applications');
  };

  getCompanyTitle = (): string => {
    return `${this.application?.company} (${this.application?.title})`;
  };
}
