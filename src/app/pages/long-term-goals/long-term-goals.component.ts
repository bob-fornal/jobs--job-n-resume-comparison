import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router,
    private service: LongTermGoalsService,
  ) {
    effect(this.handleGoalsEffect.bind(this));
  }

  handleGoalsEffect = (): void => {
    const value: Array<LongTermGoal> = this.service.structure();
    this.goals = value;
  };

  navigate = (to: string, data: number | null = null): void => {
    if (data === null) {
      this.router.navigateByUrl(`/${to}/long-term-goal`);
    } else {
      this.router.navigateByUrl(`/${to}/long-term-goal/${data}`);
    }
  };
}
