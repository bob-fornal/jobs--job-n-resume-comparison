import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-js-add-tracking-modal',
  standalone: false,
  
  templateUrl: './js-tracking-modal.component.html',
  styleUrl: './js-tracking-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsTrackingModalComponent {
  readonly dialogRef = inject(MatDialogRef<JsTrackingModalComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  datetimeValue: Date = new Date();
  
  save(): void {
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
