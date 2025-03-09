import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentation-long-term-goals',
  standalone: false,
  templateUrl: './documentation-long-term-goals.component.html',
})
export class DocumentationLongTermGoalsComponent {

  constructor(
    private router: Router,
  ) {}

  back = (): void => {
    this.router.navigateByUrl('/long-term-goals');
  };
}
