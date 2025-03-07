import { Component, effect, Inject } from '@angular/core';
import { LongTermGoalsService } from '../long-term-goals.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChecklistItem, LongTermGoal } from '../../../core/interfaces/structure-goals.interface';

@Component({
  selector: 'app-ltg-checklist-modal',
  standalone: false,
  
  templateUrl: './ltg-checklist-modal.component.html',
  styleUrl: './ltg-checklist-modal.component.css'
})
export class LtgChecklistModalComponent {

  goals: Array<LongTermGoal> = [];

  constructor(
    public dialogRef: MatDialogRef<LtgChecklistModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { index: number; },
    private service: LongTermGoalsService,
  ) {
    effect(this.handleGoalsEffect.bind(this));
  }

  handleGoalsEffect = () => {
    const value: Array<LongTermGoal> = this.service.structure();
    this.goals = value;
  };

  get checklist (): Array<ChecklistItem> {
    const goal: LongTermGoal = this.goals[this.data.index];
    const checklist: Array<ChecklistItem> = [...goal.checklist];
    return checklist;
  };

  get goalTitle (): string {
    const goal: LongTermGoal = this.goals[this.data.index];
    return goal.title;
  };

  cancel = (): void => {
    this.dialogRef.close();
  };

  save = (): void => {
    this.dialogRef.close();
  };
}
