/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class BlurModalService extends MatDialog {
  override open(
    content: ComponentType<unknown> | TemplateRef<unknown>,
    options?: MatDialogConfig<any> | undefined,
  ): MatDialogRef<any, any> {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }

    return super.open(content, options);
  }
}