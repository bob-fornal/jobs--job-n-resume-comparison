import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ActivatedRoute } from '@angular/router';
const mockActivatedRoute = {
  snapshot: {
    params: {
      type: 'edit',
      index: -1,
    },
  },
};

import { NgControl } from '@angular/forms';
const mockNgControl = {
  value: {},
  control: {
    setValue: () => ({}),
  }
} as unknown as NgControl;

import { AddEditLtgComponent } from './add-edit-ltg.component';
import { LongTermGoal } from '../../../core/interfaces/structure-goals.interface';

describe('AddEditLtgComponent', () => {
  let component: AddEditLtgComponent;
  let fixture: ComponentFixture<AddEditLtgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,

        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
      declarations: [
        AddEditLtgComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: NgControl, useValue: mockNgControl },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLtgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component['activatedRoute'].snapshot.params['type'] = 'edit';
    component['activatedRoute'].snapshot.params['index'] = -1;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "init" to capture edit/index and initGoals', () => {
    component['activatedRoute'].snapshot.params['type'] = 'edit';
    component['activatedRoute'].snapshot.params['index'] = 5;
    spyOn(component, 'initGoals').and.stub();

    component.init();
    expect(component.type).toEqual('edit');
    expect(component.index).toEqual(5);
    expect(component.initGoals).toHaveBeenCalled();
  });

  it('expects "initGoals" to set up structure', () => {
    component.index = -1;
    spyOn(component, 'initGoalStructure').and.stub();
    spyOn(component, 'patchStructure').and.stub();

    component.initGoals();
    expect(component.initGoalStructure).toHaveBeenCalled();
    expect(component.patchStructure).not.toHaveBeenCalled();
  });

  it('expects "initGoals" to set up and patch structure', () => {
    const structure: Array<LongTermGoal> = [
      { title: 'TITLE', active: true, description: '', summary: '', checklist: [] },
    ];
    component.index = 0;
    spyOn(component, 'initGoalStructure').and.stub();
    spyOn(component['service'], 'structure').and.returnValue(structure);
    spyOn(component, 'patchStructure').and.stub();

    component.initGoals();
    expect(component.initGoalStructure).toHaveBeenCalled();
    expect(component.patchStructure).toHaveBeenCalledWith(structure[0]);
  });

  it('expects "initGoalStructure" to set up goal', () => {
    component.initGoalStructure();
    expect(component.goal).not.toBeUndefined();
  });

  it('expects "patchStructure" to update goal', () => {
    const goal: LongTermGoal = {
      title: 'TITLE',
      active: true,
      description: '',
      summary: '',
      checklist: [
        { title: 'CL-TITLE', finished: true, description: 'CL-DESC' },
      ],
    };

    component.patchStructure(goal);
    expect(component.goal.get('title')!.value).toEqual('TITLE');
  });

  it('expects "get checklistControls" to return checklist FormArray', () => {
    const result: FormArray = component.checklistControls;
    expect(result).toEqual(jasmine.any(FormArray));
  });

  it('expects "getType" to return cased type', () => {
    component.type = 'edit';

    const result: string = component.getType();
    expect(result).toEqual('Edit');
  });

  it('expects "back" to navigate to long term goals page', () => {
    spyOn(component['router'], 'navigateByUrl').and.stub();

    component.back();
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/long-term-goals');
  });

  it('expects "addChecklistItem" to push an empty checklist item', () => {
    spyOn(component['fb'], 'group').and.callThrough();

    component.addChecklistItem();
    const checklist: FormArray<any> = component.goal.get('checklist') as FormArray;
    expect(checklist.length).toEqual(1);
  });

  it('expects "deleteChecklistItem" to delete the iten at index', () => {
    const goal: LongTermGoal = {
      title: 'TITLE',
      active: true,
      description: '',
      summary: '',
      checklist: [
        { title: 'CL-TITLE-1', finished: true, description: 'CL-DESC' },
        { title: 'CL-TITLE-2', finished: true, description: 'CL-DESC' },
        { title: 'CL-TITLE-3', finished: true, description: 'CL-DESC' },
      ],
    };
    component.patchStructure(goal);

    component.deleteChecklistItem(1);
    const checklist: FormArray<any> = component.goal.get('checklist') as FormArray;
    expect(checklist.length).toEqual(2);
  });

  it('expects "save" to add goals', () => {
    const goal: LongTermGoal = {
      title: 'TITLE',
      active: true,
      description: '',
      summary: '',
      checklist: [
        { title: 'CL-TITLE-1', finished: true, description: 'CL-DESC' },
        { title: 'CL-TITLE-2', finished: true, description: 'CL-DESC' },
        { title: 'CL-TITLE-3', finished: true, description: 'CL-DESC' },
      ],
    };
    component.patchStructure(goal);
    component.type = 'add';
    spyOn(component['service'], 'saveGoals').and.stub();
    spyOn(component, 'back').and.stub();

    component.save();
    expect(component['service'].saveGoals).toHaveBeenCalledWith([goal]);
    expect(component.back).toHaveBeenCalled();
  });

  it('expects "save" to edit goals', () => {
    const goal: LongTermGoal = {
      title: 'TITLE',
      active: true,
      description: '',
      summary: '',
      checklist: [
        { title: 'CL-TITLE-1', finished: true, description: 'CL-DESC' },
        { title: 'CL-TITLE-2', finished: true, description: 'CL-DESC' },
        { title: 'CL-TITLE-3', finished: true, description: 'CL-DESC' },
      ],
    };
    component.patchStructure(goal);
    component.type = 'edit';
    component.index = 0;
    spyOn(component['service'], 'saveGoals').and.stub();
    spyOn(component, 'back').and.stub();

    component.save();
    expect(component['service'].saveGoals).toHaveBeenCalledWith([goal]);
    expect(component.back).toHaveBeenCalled();
  });
});
