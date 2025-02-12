import { Component, inject } from '@angular/core';
import { Goal } from '../../core/interfaces/goal.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-goal-modal',
  standalone: false,
  
  templateUrl: './goal-modal.component.html',
  styleUrl: './goal-modal.component.css'
})
export class GoalModalComponent {

  goal = inject<Goal>(MAT_DIALOG_DATA);

  constructor(
    private dialogRef: MatDialogRef<GoalModalComponent>,
  ) {}

  cancel = (): void => {
    this.dialogRef.close();
  };

  save = (): void => {
    this.dialogRef.close(this.goal);
  };
}
