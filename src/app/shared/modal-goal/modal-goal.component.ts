import { Component, inject } from '@angular/core';
import { Goal } from '../../core/interfaces/goal.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-goal',
  standalone: false,
  
  templateUrl: './modal-goal.component.html',
})
export class ModalGoalComponent {

  goal: Goal = inject<Goal>(MAT_DIALOG_DATA);

  constructor(
    private dialogRef: MatDialogRef<ModalGoalComponent>,
  ) {}

  cancel = (): void => {
    this.dialogRef.close();
  };

  save = (): void => {
    this.dialogRef.close(this.goal);
  };
}
