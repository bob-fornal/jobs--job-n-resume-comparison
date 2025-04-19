import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { JobActivity, JobApplication } from '../../../core/interfaces/job-application';
import { SiteLink } from "../../../core/interfaces/site-link";

import { JobApplicationsService } from '../job-applications.service';
import { UtilitiesService } from '../../../core/services/utilities.service';

@Component({
  selector: 'app-add-edit-job-applications',
  standalone: false,
  templateUrl: './applications-add-edit.component.html',
})
export class ApplicationsAddEditComponent {
  readonly activatedRoute = inject(ActivatedRoute);
  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);
  readonly service = inject(JobApplicationsService);
  readonly utilities = inject(UtilitiesService);

  type = '';
  index = -1

  application!: FormGroup;

  constructor() {
    this.init();
  }

  init = async (): Promise<void> => {
    this.type = this.activatedRoute.snapshot.params['type'];
    if (this.type === 'edit') {
      this.index = +this.activatedRoute.snapshot.params['index'];
    }
    this.initApplicationStructure();
    await this.service.init();
    this.initEdit();
  }

  initApplicationStructure = (): void => {
    this.application = this.fb.group({
      title: new FormControl<string>('', [Validators.minLength(3)]),
      company: new FormControl<string>('', [Validators.minLength(3)]),
      active: new FormControl<boolean>(true),
      description: new FormControl<string>('', [Validators.minLength(5)]),
      requirements: new FormControl<string>('', [Validators.minLength(5)]),
      links: this.fb.array([]),
      tracking: this.fb.array([]),
      connections: this.fb.array([]),
    });
  };

  initEdit = (): void => {
    if (this.index > -1) {
      const application = this.service.getApplicationByIndex(this.index);
      if (application) {
        this.patchStructure(application);
      }
    }
  };

  patchStructure = (application: JobApplication): void => {
    this.application.patchValue({
      title: application.title,
      company: application.company,
      active: application.active,
      description: application.description,
      requirements: application.requirements,
    });

    application.links.forEach((item: SiteLink) => {
      const link: FormArray<any> = this.application.get('links') as FormArray;
      if (!link.invalid) {
        link.push(this.fb.group(item));
      }
    });
    application.tracking.forEach((item: JobActivity) => {
      const activity: FormArray<any> = this.application.get('tracking') as FormArray;
      if (!activity.invalid) {
        activity.push(this.fb.group(item));
      }
    });
  };

  get linkControls(): any {
    return this.application.get('links') as FormArray;
  }

  get titleType(): string {
    if (this.type.length === 0) return '';
    const type: string = this.type[0].toUpperCase() + this.type.substring(1);
    return type;
  };

  back = (): void => {
    this.router.navigateByUrl('/job-applications');
  };

  addLinkItem = (): void => {
    const linksList: FormArray = this.application.get('links') as FormArray;
    if (!linksList.invalid) {
      linksList.push(this.fb.group({
        url: '',
        type: '',
      }));
    }
  };

  deleteLinkItem = (index: number): void => {
    const linksList: FormArray = this.application.get('links') as FormArray;
    linksList.removeAt(index);
  };

  save = async (): Promise<void> => {
    const application: JobApplication = {
      title: this.application.get('title')!.value,
      company: this.application.get('company')!.value,
      active: this.application.get('active')!.value,
      description: this.application.get('description')!.value,
      requirements: this.application.get('requirements')!.value,
      links: this.application.get('links')!.value,
      tracking: this.application.get('tracking')!.value,
      connections: [],
    };

    if (this.type === 'add') {
      application.tracking = [{
        datetimestamp: this.utilities.toDatetimestamp(new Date()),
        description: 'Job Application Creation',
        tag: {
          title: 'Creation',
          backgroundColor: '#f0efef',
          foregroundColor: '#000011',
          original: true,
          showInModal: false,
        }
      }];
      await this.service.saveNewApplication(application);
    } else {
      application.index = this.index;
      await this.service.saveApplication(application);
    }

    this.back();
  };
}
