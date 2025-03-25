import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { JobApplicationsService } from '../job-applications.service';

import { JobActivity, JobApplication } from '../../../core/interfaces/job-application';
import tags from '../../../core/constants/job-application.tags.json';
import { Tag } from '../../../core/interfaces/tag';

@Component({
  selector: 'app-js-add-tracking-modal',
  standalone: false,
  
  templateUrl: './js-tracking-modal.component.html',
  styleUrl: './js-tracking-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsTrackingModalComponent {
  readonly dialogRef = inject(MatDialogRef<JsTrackingModalComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly service = inject(JobApplicationsService);

  tags: Array<Tag> = tags;
  tagSelected = 0;

  datetimeValue: Date = new Date();
  description = '';
  tag: Tag = this.tags[this.tagSelected];
  
  save(): void {
    const applications: Array<JobApplication> = this.service.structure();
    const application: JobApplication = applications[this.data.index];
    const tracking: Array<JobActivity> = application.tracking;
    tracking.push({
      datetimestamp: this.toDatetimestamp(this.datetimeValue),
      description: this.description,
      tag: this.tag,
    })
    tracking.sort((a: JobActivity, b: JobActivity) => {
      return +a.datetimestamp - +b.datetimestamp;
    });
    this.service.saveApplications(applications);
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  getTagStyle(tag: Tag) {
    return `color: ${tag.foregroundColor}; background-color: ${tag.backgroundColor};`;
  }

  selectTag(index: number) {
    this.tagSelected = index;
    this.tag = this.tags[index];
  }

  toDatetimestamp(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }
}
