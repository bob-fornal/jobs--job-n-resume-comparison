import { Injectable, signal } from '@angular/core';
import { StorageClassAbstraction } from '../../core/services/storage-class-abstraction.abstract';

@Injectable({
  providedIn: 'root'
})
export class TopToolbarService extends StorageClassAbstraction {

  private activePageSignal = signal('resumes');
  private viewGoalsSignal = signal(false);

  constructor() {
    super();

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
  }

  getDarkMode = (): boolean => {
    const mode = this.localstorage.getItem('job-squid--dark-mode');
    if (mode === null) {
      this.localstorage.setItem('job-squid--dark-mode', 'false');
      return false;
    } else {
      return mode === 'true';
    }
  };

  setDarkMode = (mode: boolean): void => {
    const modeString: string = JSON.stringify(mode);
    this.localstorage.setItem('job-squid--dark-mode', modeString);
  };

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
