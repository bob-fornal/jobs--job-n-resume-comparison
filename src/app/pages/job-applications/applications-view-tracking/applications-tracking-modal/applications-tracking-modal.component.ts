import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { JobApplicationsService } from '../../job-applications.service';
import { UtilitiesService } from '../../../../core/services/utilities.service';

import { JobActivity } from '../../../../core/interfaces/job-application';
import { Tag } from '../../../../core/interfaces/tag';
import { TaggingService } from '../../../../core/services/tagging.service';

@Component({
  selector: 'app-applications-add-tracking-modal',
  standalone: false,
  
  templateUrl: './applications-tracking-modal.component.html',
  styleUrl: './applications-tracking-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsTrackingModalComponent {
  readonly service = inject(JobApplicationsService);
  readonly tagService = inject(TaggingService);
  readonly utilities = inject(UtilitiesService);

  readonly dialogRef = inject(MatDialogRef<ApplicationsTrackingModalComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  tags: Array<Tag> = [];

  datetimeValue: Date = new Date();
  description = '';
  tag!: Tag | undefined;

  constructor() {
    this.init()
    effect(this.handleTagging.bind(this));
  }

  async init(): Promise<void> {
    await this.tagService.getTags('job-applications');
    if (this.data.tagIndex !== -1) {
      this.datetimeValue = new Date(this.data.datetimestamp);
      this.description = this.data.description;
      this.tag = this.data.tag;
    }
  }

  handleTagging() {
    const tags = this.tagService.signals['job-applications']();
    this.tags = tags;
    this.tag = this.data.tagIndex === -1 ? this.displayTags[0] : this.data.tag;
  }

  get tagTitle() {
    return this.tag === undefined ? '' : this.tag.title;
  }

  get displayTags() {
    return this.tags.filter((tag: Tag) => tag.showInModal === true);
  }

  save(): void {
    const application = this.service.getApplicationByIndex(this.data.index);
    const tracking: Array<JobActivity> = application!.tracking;
    if (this.data.tagIndex === -1) {
      tracking.push({
        datetimestamp: this.utilities.toDatetimestamp(this.datetimeValue),
        description: this.description,
        tag: this.tag,
      });
    } else {
      tracking[this.data.tagIndex] = {
        datetimestamp: this.utilities.toDatetimestamp(this.datetimeValue),
        description: this.description,
        tag: this.tag,
      };
    }
    this.service.saveApplication(application!);
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  getTagStyle(tag: Tag | undefined) {
    if (tag === undefined) return '';
    return `color: ${tag.foregroundColor}; background-color: ${tag.backgroundColor};`;
  }

  selectTag(tag: Tag) {
    this.tag = tag;
  }
}
