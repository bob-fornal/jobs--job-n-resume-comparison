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
  checklist: Array<ChecklistItem> = [];
  goalTitle = 'No Goal Title';

  constructor(
    public dialogRef: MatDialogRef<LtgChecklistModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { index: number; },
    private service: LongTermGoalsService,
  ) {
    effect(this.handleGoalsEffect.bind(this));
  }

  handleGoalsEffect = () => {
    if (this.data.index === -1) return;

    const value: Array<LongTermGoal> = this.service.structure();
    this.goals = value;

    this.checklist = JSON.parse(JSON.stringify(value[this.data.index].checklist));
    this.goalTitle = value[this.data.index].title;
  };

  changeFinishedStatus = (index: number, event: any): void => {
    this.checklist[index].finished = event.checked;
  };

  changeDescription = (index: number, event: any): void => {
    this.checklist[index].description = event.target.value;
  };

  cancel = (): void => {
    this.dialogRef.close();
  };

  save = (): void => {
    this.goals[this.data.index].checklist = this.checklist;
    this.service.saveGoals(this.goals);
    this.dialogRef.close();
  };
}
