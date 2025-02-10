import { Component, effect } from '@angular/core';

import { Goal } from '../../core/interfaces/goal.interface';
import { Item } from '../../core/interfaces/item.interface';
import { Structure } from '../../core/interfaces/strucuture.interface';

import { MatDialog } from '@angular/material/dialog';
import { DayModalComponent } from '../../shared/day-modal/day-modal.component';
import { DaysOfCodeService } from './days-of-code.service';
import { GoalModalComponent } from '../../shared/goal-modal/goal-modal.component';

@Component({
  selector: 'app-days-of-code',
  standalone: false,
  
  templateUrl: './days-of-code.component.html',
  styleUrl: './days-of-code.component.css'
})
export class DaysOfCodeComponent {
  useGoals: boolean = true;
  useNotes: boolean = true;

  days: Array<Item> = [];
  goals: Array<Goal> = [];
  _structure: Structure | null = null;

  selectedIndex: number = -1;
  draggingIndex: number = -1;

  constructor(
    private dialog: MatDialog,
    private service: DaysOfCodeService,
  ) {
    effect(this.handleStructureEffect.bind(this));
  }

  handleStructureEffect = (): void => {
    const structure: Structure = this.service.structure();
    this._structure = { ...structure };
    
    this.useGoals = structure.useGoals;
    this.useNotes = structure.useNotes;
    
    this.days = structure.days;
    this.goals = structure.goals;
  };

  toggleDay = (index: number): void => {
    const isDone: boolean = !this._structure!.days[index].done;
    this._structure!.days[index].done = isDone;

    switch (true) {
      case this.useNotes === false:
        this.service.structureChange(this._structure!);
        break;
      case isDone === true && this._structure!.days[index].note === '':
        const day: Item = { ... this._structure!.days[index] };
        this.selectedIndex = index;
        this.openDayModal(day);
        break;
      default:
        this._structure!.days[index].note = '';
        this.service.structureChange(this._structure!);
    }
  };

  openDayModal = (day: Item): void => {
    const dialogRef = this.dialog.open(DayModalComponent, { data: day });
    dialogRef.afterClosed().subscribe(this.handleDayModalClose.bind(this));
  };

  handleDayModalClose = (note: string): void => {
    this._structure!.days[this.selectedIndex].note = note;
    this.service.structureChange(this._structure!);
  };

  addNewGoal = (): void => {
    const newGoal: Goal = { type: 'New', description: '', done: false };
    const dialogRef = this.dialog.open(GoalModalComponent, { data: newGoal });
    dialogRef.afterClosed().subscribe(this.handleAddNewGoalClose.bind(this));
  };

  handleAddNewGoalClose = (goal: Goal): void => {
    const newGoal: Goal = { description: goal.description, done: goal.done };
    this._structure!.goals.push(newGoal);
    this.service.structureChange(this._structure!);
  };

  toggleGoal = (index: number): void => {
    this.goals[index].done = !this.goals[index].done;
    this._structure!.goals = [ ...this.goals ];
    this.service.structureChange(this._structure!);
  };

  editIndex: number = -1;
  editGoal = (index: number): void => {
    this.editIndex = index;
    const editGoal: Goal = { ...this.goals[index], type: 'Edit' };
    const dialogRef = this.dialog.open(GoalModalComponent, { data: editGoal });
    dialogRef.afterClosed().subscribe(this.handleEditGoalClose.bind(this));
  };

  handleEditGoalClose = (goal: Goal): void => {
    const editedGoal: Goal = { description: goal.description, done: goal.done }
    this._structure!.goals[this.editIndex] = editedGoal;
    this.service.structureChange(this._structure!);
  };

  deleteGoal = (index: number): void => {
    const goals: Array<Goal> = [...this.goals];
    goals.splice(index, 1);
    this._structure!.goals = [...goals];
    this.service.structureChange(this._structure!);
  };
}
