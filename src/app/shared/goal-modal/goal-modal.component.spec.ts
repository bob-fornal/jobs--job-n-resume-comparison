import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalModalComponent } from './goal-modal.component';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { Goal } from '../../core/interfaces/goal.interface';

describe('GoalModalComponent', () => {
  let component: GoalModalComponent;
  let fixture: ComponentFixture<GoalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        
        MatButtonModule,
        MatDialogModule,
      ],
      declarations: [
        GoalModalComponent,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { type: 'New', description: '', done: false } },
        { provide: MatDialogRef, useValue: { close: () => ({}) } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalModalComponent);
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
    const goal: Goal = { type: 'Testing', description: 'TESTING', done: true };
    component.goal = goal;

    component.save();
    expect(component['dialogRef'].close).toHaveBeenCalledWith(goal);
  });
});
