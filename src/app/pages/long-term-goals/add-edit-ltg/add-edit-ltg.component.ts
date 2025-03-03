import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-ltg',
  standalone: false,
  
  templateUrl: './add-edit-ltg.component.html',
  styleUrl: './add-edit-ltg.component.css'
})
export class AddEditLtgComponent {
  type = '';
  index = -1

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.init();
  }

  init = (): void => {
    this.type = this.activatedRoute.snapshot.params['type'];
    if (this.type === 'edit') {
      this.index = this.activatedRoute.snapshot.params['index'];
    }
  };

  getType = (): string => {
    const type: string = this.type[0].toUpperCase() + this.type.substring(1);
    return type;
  };

  back = (): void => {
    this.router.navigateByUrl('/long-term-goals');
  };
}
