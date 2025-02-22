import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentation-compare-resume',
  standalone: false,
  
  templateUrl: './documentation-compare-resume.component.html',
})
export class DocumentationCompareResumeComponent {

  constructor(
    private router: Router,
  ) {}

  back = (): void => {
    this.router.navigateByUrl('/resumes');
  };
}
