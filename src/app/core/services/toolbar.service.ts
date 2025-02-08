import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  private activePageSignal = signal('resumes');
  private viewGoalsSignal = signal(false);

  localstorage = window.localStorage;

  constructor() {
    const activePage: any = this.localstorage.getItem('job-squid--active-page');
    if (activePage !== null) {
      this.setActivePage(activePage, false);
    }
  }

  readonly viewGoals = this.viewGoalsSignal.asReadonly();

  toggleViewGoals = (): void => {
    this.viewGoalsSignal.update((value) => !value);
  };

  readonly activePage = this.activePageSignal.asReadonly();

  setActivePage = (page: string, setLocalStorage: boolean = true): void => {
    this.activePageSignal.set(page);
    if (setLocalStorage === true) {
      this.localstorage.setItem('job-squid--active-page', page);
    }
  };
}
