import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayModalComponent } from './day-modal.component';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';

describe('DayModalComponent', () => {
  let component: DayModalComponent;
  let fixture: ComponentFixture<DayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        
        MatButtonModule,
        MatDialogModule,
      ],
      declarations: [
        DayModalComponent,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { number: 1, note: 'TEST-NOTE', done: true } },
        { provide: MatDialogRef, useValue: { close: () => ({}) } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "cancel" to only close the modal', () => {
    spyOn(component['dialogRef'], 'close').and.stub();

    component.cancel();
    expect(component['dialogRef'].close).toHaveBeenCalled();
  });

  it('expects "save" to close the modal and pass the note', () => {
    spyOn(component['dialogRef'], 'close').and.stub();
    const note: string = 'CLOSE-NOTE';
    component.day.note = note;

    component.save();
    expect(component['dialogRef'].close).toHaveBeenCalledWith(note);
  });
});
