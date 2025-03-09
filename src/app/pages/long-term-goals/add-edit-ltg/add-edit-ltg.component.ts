import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ChecklistItem, LongTermGoal } from '../../../core/interfaces/structure-goals.interface';
import { LongTermGoalsService } from '../long-term-goals.service';

@Component({
  selector: 'app-add-edit-ltg',
  standalone: false,
  
  templateUrl: './add-edit-ltg.component.html',
  styleUrl: './add-edit-ltg.component.css'
})
export class AddEditLtgComponent {
  type = '';
  index = -1

  goal!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private service: LongTermGoalsService,
  ) {
    this.init();
  }

  init = (): void => {
    this.type = this.activatedRoute.snapshot.params['type'];
    if (this.type === 'edit') {
      this.index = this.activatedRoute.snapshot.params['index'];
    }
    this.initGoals();
  };

  initGoals = (): void => {
    this.initGoalStructure();

    if (this.index > -1) {
      const goals: Array<LongTermGoal> = this.service.structure();
      const goal: LongTermGoal = goals[this.index];
      this.patchStructure(goal);
    }
  };
  
  initGoalStructure = (): void => {
    this.goal = this.fb.group({
      title: new FormControl<string>('', [Validators.minLength(3)]),
      active: new FormControl<boolean>(true),
      description: new FormControl<string>('', [Validators.minLength(5)]),
      summary: new FormControl<string>('', [Validators.minLength(5)]),
      checklist: this.fb.array([]),
    });
  };

  patchStructure = (goal: LongTermGoal): void => {
    this.goal.patchValue({
      title: goal.title,
      active: goal.active,
      description: goal.description,
      summary: goal.summary,
    });

    goal.checklist.forEach((item: ChecklistItem) => {
      const checklist: FormArray<any> = this.goal.get('checklist') as FormArray;
      if (!checklist.invalid) {
        checklist.push(this.fb.group(item));
      }
    });
  };

  get checklistControls(): any {
    return this.goal.get('checklist') as FormArray;
  }

  getType = (): string => {
    const type: string = this.type[0].toUpperCase() + this.type.substring(1);
    return type;
  };

  back = (): void => {
    this.router.navigateByUrl('/long-term-goals');
  };

  addChecklistItem = (): void => {
    const checklist: FormArray<any> = this.goal.get('checklist') as FormArray;
    if (!checklist.invalid) {
      checklist.push(this.fb.group({
        title: '',
        finished: false,
        description: ''
      }));
    }
  };

  deleteChecklistItem = (index: number): void => {
    const goalChecklist: FormArray = this.goal.get('checklist') as FormArray;
    goalChecklist.removeAt(index);
  };

  save = (): void => {
    const goals: Array<LongTermGoal> = this.service.structure();

    if (this.type === 'add') {
      const goal: LongTermGoal = {
        title: this.goal.get('title')!.value,
        active: this.goal.get('active')!.value,
        description: this.goal.get('description')!.value,
        summary: this.goal.get('summary')!.value,
        checklist: this.goal.get('checklist')!.value,
      };
      goals.push(goal);
    } else {
      const goal: LongTermGoal = {
        title: this.goal.get('title')!.value,
        active: this.goal.get('active')!.value,
        description: this.goal.get('description')!.value,
        summary: this.goal.get('summary')!.value,
        checklist: this.goal.get('checklist')!.value,
      };
      goals[this.index] = goal;
    }

    this.service.saveGoals(goals);
    this.back();
  };
}
