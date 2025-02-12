import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-ignore-list',
  standalone: false,
  
  templateUrl: './modal-ignore-list.component.html',
})
export class ModalIgnoreListComponent {

  ignoreList: string = inject<string>(MAT_DIALOG_DATA);

  constructor(
    private dialogRef: MatDialogRef<ModalIgnoreListComponent>,
  ) {}

  cancel = (): void => {
    this.dialogRef.close();
  };

  save = (): void => {
    this.dialogRef.close(this.ignoreList);
  };
}
