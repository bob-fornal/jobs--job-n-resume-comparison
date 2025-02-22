import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentation-days-of-code',
  standalone: false,
  
  templateUrl: './documentation-days-of-code.component.html',
})
export class DocumentationDaysOfCodeComponent {

  constructor(
    private router: Router,
  ) {}

  back = (): void => {
    this.router.navigateByUrl('/days-of-code');
  };
}
