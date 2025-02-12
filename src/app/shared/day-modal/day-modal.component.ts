import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Item } from '../../core/interfaces/item.interface';

@Component({
  selector: 'app-day-modal',
  standalone: false,
  
  templateUrl: './day-modal.component.html',
  styleUrl: './day-modal.component.css'
})
export class DayModalComponent {

  day = inject<Item>(MAT_DIALOG_DATA);

  constructor(
    private dialogRef: MatDialogRef<DayModalComponent>,
  ) {}

  cancel = (): void => {
    this.dialogRef.close();
  };

  save = (): void => {
    this.dialogRef.close(this.day.note);
  };
}
