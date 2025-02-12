import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Item } from '../../core/interfaces/item.interface';

@Component({
  selector: 'app-modal-day',
  standalone: false,
  
  templateUrl: './modal-day.component.html',
})
export class ModalDayComponent {

  day: Item = inject<Item>(MAT_DIALOG_DATA);

  constructor(
    private dialogRef: MatDialogRef<ModalDayComponent>,
  ) {}

  cancel = (): void => {
    this.dialogRef.close();
  };

  save = (): void => {
    this.dialogRef.close(this.day.note);
  };
}
