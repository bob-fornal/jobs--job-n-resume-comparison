import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentation-job-applications',
  standalone: false,
  templateUrl: './documentation-job-applications.component.html',
})
export class DocumentationJobApplicationsComponent {

  constructor(
    private router: Router,
  ) {}

  back = (): void => {
    this.router.navigateByUrl('/job-applications');
  };
}
