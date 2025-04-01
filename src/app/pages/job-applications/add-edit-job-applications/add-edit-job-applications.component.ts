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
  templateUrl: './add-edit-job-applications.component.html',
})
export class AddEditJobApplicationsComponent {
  readonly utilities = inject(UtilitiesService);

  type = '';
  index = -1

  application!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private service: JobApplicationsService,
  ) {
    this.init();
  }

  init = (): void => {
    this.type = this.activatedRoute.snapshot.params['type'];
    if (this.type === 'edit') {
      this.index = this.activatedRoute.snapshot.params['index'];
    }
    this.initApplications();
  }

  initApplications = (): void => {
    this.initApplicationStructure();

    if (this.index > -1) {
      const applications: Array<JobApplication> = this.service.structure();
      const application: JobApplication = applications[this.index];
      this.patchStructure(application);
    }
  };

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
    })
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

  getType = (): string => {
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

  save = (): void => {
    const applications: Array<JobApplication> = this.service.structure();

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
        }
      }]
      applications.push(application);
    } else {
      applications[this.index] = application;
    }

    this.service.saveApplications(applications)
    this.back();
  };
}
