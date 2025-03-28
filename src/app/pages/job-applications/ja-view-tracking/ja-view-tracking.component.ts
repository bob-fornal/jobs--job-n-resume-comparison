import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { JobApplicationsService } from '../job-applications.service';
import { JobActivity, JobApplication } from '../../../core/interfaces/job-application';

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
    const emptyTag: Tag = {
      title: '',
      backgroundColor: '',
      foregroundColor: '',
      original: false,
    };
    this.dialog.open(JsTrackingModalComponent, {
      data: {
        index: this.index,
        title: 'Add',
        datetimestamp: '',
        description: '',
        tag: emptyTag,
        connection: {},
      },
    });
  };

  handleAddTrackingItemClosed = (): void => {
    //
  };

  editTrackingItem = (index: number): void => {
    const trackingItem: JobActivity = this.application!.tracking[index];
    this.dialog.open(JsTrackingModalComponent, {
      data: {
        index,
        title: 'Edit',
        datetimestamp: trackingItem.datetimestamp,
        description: trackingItem.description,
        tag: trackingItem.tag,
        connection: trackingItem.connection,
      },
    });
  };

  deleteTrackingItem = (index: number): void => {
    const applications: Array<JobApplication> = this.service.structure();
    const application: JobApplication = applications[this.index];
    const tracking: Array<JobActivity> = application.tracking;
    tracking.splice(index, 1);
    tracking.sort((a: JobActivity, b: JobActivity) => {
      return +a.datetimestamp - +b.datetimestamp;
    });
    this.service.saveApplications(applications);
  };

  isIndexOdd = (index: number): boolean => {
    if (index === 0) return false;
    return index % 2 !== 0;
  }

  getTrackingStyle(item: JobActivity): string {
    return `
      color: ${item.tag.foregroundColor};
      background-color: ${item.tag.backgroundColor};
      border: 2px solid ${item.tag.foregroundColor};
    `;
  }

  getDatetime(datetimestamp: string): string {
    const date = new Date(datetimestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  };
}
