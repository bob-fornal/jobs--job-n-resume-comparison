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

    const viewGoalsString: any = this.localstorage.getItem('job-squid--view-goals');
    if (viewGoalsString === null) {
      this.viewGoalsSignal.set(false);
    } else {
      this.viewGoalsSignal.set(viewGoalsString === 'true');
    }
    console.log('toolbarService constructor', this.viewGoals());
  }

  readonly viewGoals = this.viewGoalsSignal.asReadonly();

  setViewGoals = (state: boolean): void => {
    this.viewGoalsSignal.set(state);
    this.localstorage.setItem('job-squid--view-goals', state + '');
  };

  readonly activePage = this.activePageSignal.asReadonly();

  setActivePage = (page: string, setLocalStorage: boolean = true): void => {
    this.activePageSignal.set(page);
    if (setLocalStorage === true) {
      this.localstorage.setItem('job-squid--active-page', page);
    }
  };
}
