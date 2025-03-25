import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { JobApplicationsService } from '../job-applications.service';
import { JobApplication } from '../../../core/interfaces/job-application';

import { Tag } from '../../../core/interfaces/tag';

import { JsTrackingModalComponent } from '../js-tracking-modal/js-tracking-modal.component';

@Component({
  selector: 'app-ja-view-tracking',
  standalone: false,
  
  templateUrl: './ja-view-tracking.component.html',
  styleUrl: './ja-view-tracking.component.css'
})
export class JAViewTrackingComponent {
  readonly dialog = inject(MatDialog);
  
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

  addTrackingItem = (): void => {
    const emptyTag: Tag = { title: '', backgroundColor: '', foregroundColor: '' };
    const dialogRef = this.dialog.open(JsTrackingModalComponent, {
      data: {
        title: 'Add',
        datetimestamp: '',
        description: '',
        tag: emptyTag,
        connection: {},
      },
    });

    dialogRef.afterClosed().subscribe(this.handleAddTrackingItemClosed.bind(this));
  };

  handleAddTrackingItemClosed = (): void => {
    //
  };

  deleteTrackingItem = (index: number): void => {
    //
  };
}
