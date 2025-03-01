import { Component, effect, Signal, signal } from '@angular/core';

import { LongTermGoalsService } from './long-term-goals.service';

import { LongTermGoal } from '../../core/interfaces/structure-goals.interface';

@Component({
  selector: 'app-long-term-goals',
  standalone: false,
  
  templateUrl: './long-term-goals.component.html',
  styleUrl: './long-term-goals.component.css'
})
export class LongTermGoalsComponent {

  goals: Array<LongTermGoal> = [];

  constructor(
    private service: LongTermGoalsService,
  ) {
    effect(this.handleGoalsEffect.bind(this));
  }

  handleGoalsEffect = (): void => {
    const value: Array<LongTermGoal> = this.service.structure();
    this.goals = value;
  };
}
