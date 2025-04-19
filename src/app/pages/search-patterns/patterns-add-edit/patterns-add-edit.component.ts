import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { SearchPatternsService } from '../search-patterns.service';

@Component({
  selector: 'app-patterns-add-edit',
  standalone: false,
  
  templateUrl: './patterns-add-edit.component.html',
  styleUrl: './patterns-add-edit.component.css'
})
export class PatternsAddEditComponent {
  readonly activatedRoute = inject(ActivatedRoute);
  readonly service = inject(SearchPatternsService);

  type = '';
  index = -1;

  pattern!: FormGroup;

  constructor() {
    this.init();
  }

  init = async (): Promise<void> => {
    this.type = this.activatedRoute.snapshot.params['type'];
    if (this.type === 'edit') {
      this.index = +this.activatedRoute.snapshot.params['index'];
    }

  };

  get titleType(): string {
    if (this.type.length === 0) return '';
    const type: string = this.type[0].toUpperCase() + this.type.substring(1);
    return type;
  };
}
