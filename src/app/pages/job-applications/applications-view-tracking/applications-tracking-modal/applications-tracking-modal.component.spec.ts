import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { provideNativeDateAdapter } from '@angular/material/core';

import { ApplicationsTrackingModalComponent } from './applications-tracking-modal.component';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('ApplicationsTrackingModalComponent', () => {
  let component: ApplicationsTrackingModalComponent;
  let fixture: ComponentFixture<ApplicationsTrackingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,

        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatTimepickerModule,
      ],
      declarations: [
        ApplicationsTrackingModalComponent,
      ],
      providers: [
        provideAnimationsAsync(),
        provideNativeDateAdapter(),
        { provide: MAT_DIALOG_DATA, useValue: { tagIndex: -1, datetimestamp: '', description: '', tag: {} } },
        { provide: MatDialogRef, useValue: { close: () => ({}) } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsTrackingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
