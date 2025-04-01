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
  readonly activatedRoute = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly service = inject(JobApplicationsService);
  
  company = '';
  title = '';
  application: JobApplication | null = null;

  constructor() {
    effect(this.handleApplicationsEffect.bind(this));
  }

  handleApplicationsEffect = (): void => {
    this.company = this.activatedRoute.snapshot.params['company'];
    this.title = this.activatedRoute.snapshot.params['title'];

    const applications: Array<JobApplication> = this.service.structure();
    const index: number = this.getApplicationIndex(applications, this.company, this.title);
    this.application = applications[index];
  };

  getApplicationIndex(applications: Array<JobApplication>, company: string, title: string): number {
    let index = -1;
    for (let i = 0, len = applications.length; i < len; i++) {
      const compareCompany: string = applications[i].company.replaceAll('.', '-').toLowerCase();
      const compareTitle: string = applications[i].title.replaceAll(' ', '-').toLowerCase();

      if (compareCompany === company && compareTitle === title) {
        index = i;
        break;
      }
    }
    return index;
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
    };
    this.dialog.open(JsTrackingModalComponent, {
      data: {
        company: {
          name: this.company,
          title: this.title,
        },
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
    
    const applicationIndex: number = this.getApplicationIndex(applications, this.company, this.title);
    const application: JobApplication = applications[applicationIndex];

    const tracking: Array<JobActivity> = application.tracking;
    const correctedIndex: number = tracking.length - index - 1;
    tracking.splice(correctedIndex, 1);

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
