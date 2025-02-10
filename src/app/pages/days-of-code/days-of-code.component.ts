import { Component } from '@angular/core';

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
    this.service.structure.subscribe(this.handleStructureChange);
  }

  handleStructureChange = (structure: Structure): void => {
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
    const dialogRef = this.dialog.open(GoalModalComponent, { data: { type: 'New', description: '', done: false } });
    dialogRef.afterClosed().subscribe(this.handleAddNewGoalClose.bind(this));
  };

  handleAddNewGoalClose = (goal: Goal): void => {
    this._structure!.goals.push({ description: goal.description, done: goal.done });
    this.service.structureChange(this._structure!);
  };

  toggleGoal = (index: number): void => {
    this.goals[index].done = !this.goals[index].done;
    this._structure!.goals = [ ...this.goals ];
    this.service.structureChange(this._structure!);
  };
}
