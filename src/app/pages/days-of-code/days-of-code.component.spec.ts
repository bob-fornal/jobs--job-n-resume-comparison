import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysOfCodeComponent } from './days-of-code.component';

import { MockItemImageComponent } from '../../shared/_specs/components/mock-item-image.spec';

import { Goal } from '../../core/interfaces/goal.interface';
import { Item } from '../../core/interfaces/item.interface';
import { Structure } from '../../core/interfaces/strucuture.interface';

describe('DaysOfCodeComponent', () => {
  let component: DaysOfCodeComponent;
  let fixture: ComponentFixture<DaysOfCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DaysOfCodeComponent,

        MockItemImageComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysOfCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "handleStructureEffect" to get a structure and assign data', () => {
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [
        { number: 1, note: 'NOTE', done: false },
      ],
      goals: [
        { description: 'DESCRIPTION', done: false },
      ],
    };
    spyOn(component['service'], 'structure').and.returnValue(structure);
    component.useGoals = false;
    component.useNotes = false;
    component.days = [];
    component.goals = [];

    component.handleStructureEffect();
    expect(component._structure).toEqual(structure);
    expect(component.useGoals).toEqual(true);
    expect(component.useNotes).toEqual(true);
    expect(component.days).toEqual(structure.days);
    expect(component.goals).toEqual(structure.goals);
  });

  it('expects "toggleDay" to toggle state and update structure if useNotes is false', () => {
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [
        { number: 1, note: 'NOTE', done: false },
      ],
      goals: [
        { description: 'DESCRIPTION', done: false },
      ],
    };
    component._structure = structure;
    component.useNotes = false;
    const index: number = 0;
    spyOn(component['service'], 'structureChange').and.stub();

    component.toggleDay(index);
    expect(structure.days[index].done).toEqual(true);
    expect(component['service'].structureChange).toHaveBeenCalledWith(structure);
  });

  it('expects "toggleDay" to toggle state and open modal for a new note', () => {
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [
        { number: 1, note: '', done: false },
      ],
      goals: [
        { description: 'DESCRIPTION', done: false },
      ],
    };
    component._structure = structure;
    component.useNotes = true;
    const index: number = 0;
    spyOn(component, 'openDayModal');

    component.toggleDay(index);
    expect(structure.days[index].done).toEqual(true);
    expect(component.selectedIndex).toEqual(index);
    expect(component.openDayModal).toHaveBeenCalledWith(structure.days[index]);
  });

  it('expects "toggleDay" to toggle state and clear the note', () => {
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [
        { number: 1, note: 'NOTE', done: false },
      ],
      goals: [
        { description: 'DESCRIPTION', done: false },
      ],
    };
    component._structure = structure;
    component.useNotes = true;
    const index: number = 0;
    spyOn(component['service'], 'structureChange').and.stub();

    component.toggleDay(index);
    expect(structure.days[index].done).toEqual(true);
    expect(structure.days[index].note).toEqual('');
    expect(component['service'].structureChange).toHaveBeenCalledWith(structure);
  });

  it('expects "openDayModal" to open the modal', () => {
    const afterClosed: any = {
      subscribe: () => ({}),
    };
    const openResult: any = {
      afterClosed: () => (afterClosed),
    };
    spyOn(component['dialog'], 'open').and.returnValue(openResult as any);
    spyOn(afterClosed, 'subscribe').and.stub();
    const day: Item = { number: 1, note: 'NOTE', done: false };

    component.openDayModal(day);
    expect(component['dialog'].open).toHaveBeenCalledWith(jasmine.any(Function), { data: day });
    expect(afterClosed.subscribe).toHaveBeenCalled();
  });

  it('expects "handleDayModalClose" to do nothing if note is undefined', () => {
    const note: string | undefined = undefined;
    spyOn(component['service'], 'structureChange').and.stub();

    component.handleDayModalClose(note);
    expect(component['service'].structureChange).not.toHaveBeenCalled();
  });

  it('expects "handleDayModalClose" to update the structure and store', () => {
    const note: string | undefined = 'TEST-NOTE';
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [
        { number: 1, note: 'NOTE', done: false },
      ],
      goals: [
        { description: 'DESCRIPTION', done: false },
      ],
    };
    component._structure = structure;
    component.selectedIndex = 0;
    spyOn(component['service'], 'structureChange').and.stub();

    component.handleDayModalClose(note);
    expect(structure.days[0].note).toEqual(note);
    expect(component['service'].structureChange).toHaveBeenCalledWith(structure);
  });

  it('expects "addNewGoal" to open the modal', () => {
    const afterClosed: any = {
      subscribe: () => ({}),
    };
    const openResult: any = {
      afterClosed: () => (afterClosed),
    };
    spyOn(component['dialog'], 'open').and.returnValue(openResult as any);
    spyOn(afterClosed, 'subscribe').and.stub();
    const goal: Goal = { type: 'New', description: '', done: false };

    component.addNewGoal();
    expect(component['dialog'].open).toHaveBeenCalledWith(jasmine.any(Function), { data: goal });
    expect(afterClosed.subscribe).toHaveBeenCalled();
  });

  it('expects "handleAddNewGoalClose" to do nothing if note is undefined', () => {
    const goal: Goal | undefined = undefined;
    spyOn(component['service'], 'structureChange').and.stub();

    component.handleAddNewGoalClose(goal);
    expect(component['service'].structureChange).not.toHaveBeenCalled();
  });

  it('expects "handleAddNewGoalClose" to update the structure and store', () => {
    const goal: Goal | undefined = { description: 'NEW-DESCRIPTION', done: true };
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [
        { number: 1, note: 'NOTE', done: false },
      ],
      goals: [
        { description: 'DESCRIPTION', done: false },
      ],
    };
    component._structure = structure;
    component.selectedIndex = 0;
    spyOn(component['service'], 'structureChange').and.stub();

    component.handleAddNewGoalClose(goal);
    expect(structure.goals[1]).toEqual(goal);
    expect(component['service'].structureChange).toHaveBeenCalledWith(structure);
  });

  it('expects "toggleGoal" to invert and store update goal state', () => {
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [
        { number: 1, note: 'NOTE', done: false },
      ],
      goals: [
        { description: 'DESCRIPTION', done: false },
      ],
    };
    component._structure = structure;
    const goals: Array<Goal> = [
      { description: 'DESCRIPTION-1', done: true },
      { description: 'DESCRIPTION-2', done: false },
    ];
    component.goals = goals;
    const index: number = 1;
    spyOn(component['service'], 'structureChange').and.stub();

    component.toggleGoal(index);
    expect(goals[index].done).toEqual(true);
    expect(structure.goals).toEqual(component.goals);
    expect(component['service'].structureChange).toHaveBeenCalledWith(structure);
  });

  it('expects "editGoal" to open the modal', () => {
    const afterClosed: any = {
      subscribe: () => ({}),
    };
    const openResult: any = {
      afterClosed: () => (afterClosed),
    };
    spyOn(component['dialog'], 'open').and.returnValue(openResult as any);
    spyOn(afterClosed, 'subscribe').and.stub();
    const goals: Array<Goal> = [
      { description: 'DESCRIPTION-1', done: true },
      { description: 'DESCRIPTION-2', done: false },
    ];
    component.goals = goals;
    const expected: Goal = { type: 'Edit', description: 'DESCRIPTION-1', done: true };
    const index: number = 0;

    component.editGoal(index);
    expect(component.editIndex).toEqual(index);
    expect(component['dialog'].open).toHaveBeenCalledWith(jasmine.any(Function), { data: expected });
    expect(afterClosed.subscribe).toHaveBeenCalled();
  });

  it('expects "handleEditGoalClose" to do nothing if note is undefined', () => {
    const goal: Goal | undefined = undefined;
    spyOn(component['service'], 'structureChange').and.stub();

    component.handleEditGoalClose(goal);
    expect(component['service'].structureChange).not.toHaveBeenCalled();
  });

  it('expects "handleEditGoalClose" to update the structure and store', () => {
    const goal: Goal | undefined = { description: 'NEW-DESCRIPTION', done: true };
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [
        { number: 1, note: 'NOTE', done: false },
      ],
      goals: [
        { description: 'DESCRIPTION', done: false },
      ],
    };
    component._structure = structure;
    component.editIndex = 0;
    spyOn(component['service'], 'structureChange').and.stub();

    component.handleEditGoalClose(goal);
    expect(structure.goals[0]).toEqual(goal);
    expect(component['service'].structureChange).toHaveBeenCalledWith(structure);
  });

  it('expects "deleteGoal" to remove the index from goals', () => {
    const goals: Array<Goal> = [
      { description: 'DESCRIPTION-1', done: true },
      { description: 'DESCRIPTION-2', done: false },
      { description: 'DESCRIPTION-3', done: false },
    ];
    component.goals = goals;
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [
        { number: 1, note: 'NOTE', done: false },
      ],
      goals: goals,
    };
    component._structure = structure;
    const index: number = 1;
    const expected: Array<Goal> = [
      { description: 'DESCRIPTION-1', done: true },
      { description: 'DESCRIPTION-3', done: false },
    ];
    spyOn(component['service'], 'structureChange').and.stub();

    component.deleteGoal(index);
    expect(component.goals).toEqual(expected);
    expect(component['service'].structureChange).toHaveBeenCalledWith(structure);
  });
});
