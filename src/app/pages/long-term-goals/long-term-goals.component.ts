import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';

import { LongTermGoalsService } from './long-term-goals.service';

import { ChecklistItem, LongTermGoal } from '../../core/interfaces/structure-goals.interface';
import { MatDialog } from '@angular/material/dialog';
import { LtgChecklistModalComponent } from './ltg-checklist-modal/ltg-checklist-modal.component';

@Component({
  selector: 'app-long-term-goals',
  standalone: false,
  
  templateUrl: './long-term-goals.component.html',
  styleUrl: './long-term-goals.component.css'
})
export class LongTermGoalsComponent {

  goals: Array<LongTermGoal> = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private service: LongTermGoalsService,
  ) {
    effect(this.handleGoalsEffect.bind(this));
  }

  handleGoalsEffect = (): void => {
    const value: Array<LongTermGoal> = this.service.structure();
    this.goals = value;
  };

  getChecklistStatus = (list: Array<ChecklistItem>): string => {
    const total: number = list.length;
    const finished: number = (list.filter((item: ChecklistItem) => item.finished === true)).length;

    return `Finished ${finished} of ${total}`;
  };

  editChecklist = (index: number): void => {
    this.dialog.open(LtgChecklistModalComponent, {
      data: { index },
    });
  };

  navigate = (to: string, data: number | null = null): void => {
    if (data === null) {
      this.router.navigateByUrl(`/long-term-goals/${to}`);
    } else {
      this.router.navigateByUrl(`/long-term-goals/${to}/${data}`);
    }
  };

  delete = (index: number): void => {
    const goals: Array<LongTermGoal> = [...this.goals];
    goals.splice(index, 1);
    this.service.saveGoals(goals);
  };
}
