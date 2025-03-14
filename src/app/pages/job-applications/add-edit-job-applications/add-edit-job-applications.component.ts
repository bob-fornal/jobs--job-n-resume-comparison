import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-job-applications',
  standalone: false,
  
  templateUrl: './add-edit-job-applications.component.html',
  styleUrl: './add-edit-job-applications.component.css'
})
export class AddEditJobApplicationsComponent {
  type = '';
  index = -1

  application!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
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
  };

  initApplicationStructure = (): void => {
    this.application = this.fb.group({
      title: new FormControl<string>('', [Validators.minLength(3)]),
      active: new FormControl<boolean>(true),
      description: new FormControl<string>('', [Validators.minLength(5)]),
      applicationDate: new FormControl<string>('', [Validators.minLength(5)]),
      linkToPosting: new FormControl<string>('', [Validators.minLength(5)]),
      linkToCareersPage: new FormControl<string>('', [Validators.minLength(5)]),
      tracking: this.fb.array([]),
      connections: this.fb.array([]),
    })
  };

  getType = (): string => {
    const type: string = this.type[0].toUpperCase() + this.type.substring(1);
    return type;
  };

  back = (): void => {
    this.router.navigateByUrl('/job-applications');
  };

  save = (): void => {
    this.back();
  };
}
