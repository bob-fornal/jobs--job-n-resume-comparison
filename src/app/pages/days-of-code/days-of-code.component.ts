import { Component, effect, ViewChild } from '@angular/core';

import { Goal } from '../../core/interfaces/goal.interface';
import { Item } from '../../core/interfaces/item.interface';
import { Structure } from '../../core/interfaces/strucuture.interface';

import { MatDialog } from '@angular/material/dialog';
import { ModalDayComponent } from '../../shared/modal-day/modal-day.component';
import { DaysOfCodeService } from './days-of-code.service';
import { ModalGoalComponent } from '../../shared/modal-goal/modal-goal.component';

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

  @ViewChild('fileUpload') fileUpload: any;

  fileReader: any = FileReader;

  constructor(
    private dialog: MatDialog,
    private service: DaysOfCodeService,
  ) {
    effect(this.handleStructureEffect.bind(this));
    effect(this.handleTriggerImportEffect.bind(this));
  }

  handleStructureEffect = (): void => {
    const structure: Structure = this.service.structure();
    this._structure = { ...structure };
    
    this.useGoals = structure.useGoals;
    this.useNotes = structure.useNotes;
    
    this.days = structure.days;
    this.goals = structure.goals;
  };

  handleTriggerImportEffect = (): void => {
    const triggerImport: string = this.service.triggerImport();
    if (triggerImport === 'active') {
      this.service.clearTriggerImport();
      this.fileUpload.nativeElement.click();
    }
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
    const dialogRef = this.dialog.open(ModalDayComponent, { data: day });
    dialogRef.afterClosed().subscribe(this.handleDayModalClose.bind(this));
  };

  handleDayModalClose = (note: string | undefined): void => {
    if (note === undefined) return;
    this._structure!.days[this.selectedIndex].note = note;
    this.service.structureChange(this._structure!);
  };

  addNewGoal = (): void => {
    const newGoal: Goal = { type: 'New', description: '', done: false };
    const dialogRef = this.dialog.open(ModalGoalComponent, { data: newGoal });
    dialogRef.afterClosed().subscribe(this.handleAddNewGoalClose.bind(this));
  };

  handleAddNewGoalClose = (goal: Goal | undefined): void => {
    if (goal === undefined) return;
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
    const dialogRef = this.dialog.open(ModalGoalComponent, { data: editGoal });
    dialogRef.afterClosed().subscribe(this.handleEditGoalClose.bind(this));
  };

  handleEditGoalClose = (goal: Goal | undefined): void => {
    if (goal === undefined) return;
    const editedGoal: Goal = { description: goal.description, done: goal.done }
    this._structure!.goals[this.editIndex] = editedGoal;
    this.service.structureChange(this._structure!);
  };

  deleteGoal = (index: number): void => {
    const goals: Array<Goal> = [...this.goals];
    goals.splice(index, 1);
    this.goals = goals;
    this._structure!.goals = [...goals];
    this.service.structureChange(this._structure!);
  };

  requiredFileType: string = 'application/JSON';

  onFileSelect = (event: any): void => {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new this.fileReader();
      reader.onload = this.readerOnload.bind(this);
      reader.readAsText(file);
    }
  };

  readerOnload = (event: any) => {
    const content: string = event.target.result;
    const structure: Structure = JSON.parse(content);
    this.service.structureChange(structure);
  };
}
