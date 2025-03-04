import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ChecklistItem, LongTermGoal } from '../../../core/interfaces/structure-goals.interface';

@Component({
  selector: 'app-add-edit-ltg',
  standalone: false,
  
  templateUrl: './add-edit-ltg.component.html',
  styleUrl: './add-edit-ltg.component.css'
})
export class AddEditLtgComponent {
  type = '';
  index = -1

  goal = new FormGroup({
    goalTitle: new FormControl<string>('', [Validators.minLength(3)]),
    goalActive: new FormControl<boolean>(true),
    goalDescription: new FormControl<string>('', [Validators.minLength(5)]),
    goalSummary: new FormControl<string>('', [Validators.minLength(5)]),
    goalChecklist: new FormControl<Array<ChecklistItem>>([]),
  });

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

  addChecklistItem = (): void => {
    const goalChecklist: Array<ChecklistItem> = this.goal.get('goalChecklist')!.value || [];
    goalChecklist.push({ title: '', finished: false, description: '' });
    this.goal.patchValue({
      goalChecklist: goalChecklist,
    });
  };

  deleteChecklistItem = (index: number): void => {
    const goalChecklist: Array<ChecklistItem> = this.goal.get('goalChecklist')!.value || [];
    goalChecklist.splice(index, 1);
    this.goal.patchValue({
      goalChecklist: goalChecklist,
    });
  };
}
