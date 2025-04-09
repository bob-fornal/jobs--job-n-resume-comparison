import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { JobApplicationsService } from '../job-applications.service';
import { JobActivity, JobApplication } from '../../../core/interfaces/job-application';

import { Tag } from '../../../core/interfaces/tag';

import { ApplicationsTrackingModalComponent } from './applications-tracking-modal/applications-tracking-modal.component';

@Component({
  selector: 'app-applications-view-tracking',
  standalone: false,
  
  templateUrl: './applications-view-tracking.component.html',
  styleUrl: './applications-view-tracking.component.css'
})
export class ApplicationsViewTrackingComponent {
  readonly dialog = inject(MatDialog);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly service = inject(JobApplicationsService);
  
  index = -1;
  application: JobApplication | null = null;

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    await this.service.init();
    this.index = +this.activatedRoute.snapshot.params['index'];
    this.application = this.service.getApplicationByIndex(this.index);
  }

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
      showInModal: false,
    };
    this.dialog.open(ApplicationsTrackingModalComponent, {
      data: {
        index: this.application!.index,
        title: 'Add',
        datetimestamp: '',
        description: '',
        tag: emptyTag,
        tagIndex: -1,
        connection: {},
      },
    });
  };

  handleAddTrackingItemClosed = (): void => {
    //
  };

  editTrackingItem = (index: number): void => {
    const trackingItem: JobActivity = this.application!.tracking[index];
    this.dialog.open(ApplicationsTrackingModalComponent, {
      data: {
        index: this.application!.index,
        title: 'Edit',
        datetimestamp: trackingItem.datetimestamp,
        description: trackingItem.description,
        tag: trackingItem.tag,
        tagIndex: index,
        connection: trackingItem.connection,
      },
    });
  };

  deleteTrackingItem = (index: number): void => {
    const tracking: Array<JobActivity> = this.application!.tracking;
    tracking.splice(index, 1);

    tracking.sort((a: JobActivity, b: JobActivity) => {
      return +a.datetimestamp - +b.datetimestamp;
    });
    this.service.saveApplication(this.application!);
  };

  isIndexOdd = (index: number): boolean => {
    if (index === 0) return false;
    return index % 2 !== 0;
  }

  getTrackingStyle(item: JobActivity): string {
    return `
      color: ${item.tag!.foregroundColor};
      background-color: ${item.tag!.backgroundColor};
      border: 2px solid ${item.tag!.foregroundColor};
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
