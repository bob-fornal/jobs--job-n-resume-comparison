import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockMatDialogRef } from '../../../shared/_specs/mock-dialog-ref.spec';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { LongTermGoalsService } from '../long-term-goals.service';
import { MockLongTermGoalsService } from '../../../shared/_specs/services/mock-long-term-goals-service.spec';

import { LtgChecklistModalComponent } from './ltg-checklist-modal.component';
import { LongTermGoal } from '../../../core/interfaces/structure-goals.interface';

describe('LtgChecklistModalComponent', () => {
  let component: LtgChecklistModalComponent;
  let fixture: ComponentFixture<LtgChecklistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatIconModule,
      ],
      declarations: [
        LtgChecklistModalComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { index: -1 } },
        { provide: LongTermGoalsService, useValue: MockLongTermGoalsService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LtgChecklistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "handleGoalsEffect" to handle no index', () => {
    component.data.index = -1;

    component.handleGoalsEffect();
    expect(component.checklist).toEqual([]);
    expect(component.goalTitle).toEqual('No Goal Title');
  });

  it('expects "handleGoalsEffect" to get checklist and title', () => {
    const structure: Array<LongTermGoal> = [
      { title: 'TITLE1', active: true, description: '', summary: '', checklist: [
        { title: 'CHECKLIST1', finished: false, description: '' },
      ] },
      { title: 'TITLE2', active: true, description: '', summary: '', checklist: [
        { title: 'CHECKLIST2', finished: false, description: '' },
      ] },
      { title: 'TITLE3', active: true, description: '', summary: '', checklist: [
        { title: 'CHECKLIST3', finished: false, description: '' },
      ] },
    ];
    spyOn(component['service'], 'structure').and.returnValue(structure);
    component.data.index = 1;

    component.handleGoalsEffect();
    expect(component.checklist).toEqual(structure[1].checklist);
    expect(component.goalTitle).toEqual(structure[1].title);
  });

  it('expects "changeFinishedStatus" to change the status', () => {
    component.checklist = [
      { title: 'TITLE', finished: false, description: '' },
    ];
    const index = 0;
    const event: any = {
      checked: true,
    };

    component.changeFinishedStatus(index, event);
    expect(component.checklist[0].finished).toEqual(true);
  });

  it('expects "changeDescription" to change the status', () => {
    component.checklist = [
      { title: 'TITLE', finished: false, description: '' },
    ];
    const index = 0;
    const event: any = {
      target: {
        value: 'NEW DESCRIPTION',
      },
    };

    component.changeDescription(index, event);
    expect(component.checklist[0].description).toEqual('NEW DESCRIPTION');
  });

  it('expects "cancel" to close the dialog', () => {
    component.cancel();
    expect(component['dialogRef'].close).toHaveBeenCalled();
  });

  it('expects "save" to save checklist data and close', () => {
    const goals: Array<LongTermGoal> = [
      { title: 'TITLE1', active: true, description: '', summary: '', checklist: [
        { title: 'CHECKLIST1', finished: false, description: '' },
      ] },
      { title: 'TITLE2', active: true, description: '', summary: '', checklist: [
        { title: 'CHECKLIST2', finished: false, description: '' },
      ] },
      { title: 'TITLE3', active: true, description: '', summary: '', checklist: [
        { title: 'CHECKLIST3', finished: false, description: '' },
      ] },
    ];
    component.checklist = [{ title: 'CHECKLIST2', finished: true, description: 'SOLID' }];
    component.goals = goals;
    component.data.index = 1;
    const expected: Array<LongTermGoal> = [
      { title: 'TITLE1', active: true, description: '', summary: '', checklist: [
        { title: 'CHECKLIST1', finished: false, description: '' },
      ] },
      { title: 'TITLE2', active: true, description: '', summary: '', checklist: [
        { title: 'CHECKLIST2', finished: true, description: 'SOLID' },
      ] },
      { title: 'TITLE3', active: true, description: '', summary: '', checklist: [
        { title: 'CHECKLIST3', finished: false, description: '' },
      ] },
    ];
    spyOn(component['service'], 'saveGoals').and.stub();
    
    component.save();
    expect(component['service'].saveGoals).toHaveBeenCalledWith(expected);
    expect(component['dialogRef'].close).toHaveBeenCalled();
  });
});
