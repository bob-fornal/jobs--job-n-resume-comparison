import { Injectable, signal } from '@angular/core';
import { StorageClassAbstraction } from '../../core/services/storage-class-abstraction.abstract';
import { BehaviorSubject } from 'rxjs';

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
    this.viewGoals$.next(this.viewGoalsSignal());
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
  public viewGoals$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setViewGoals = (state: boolean): void => {
    this.viewGoalsSignal.set(state);
    this.localstorage.setItem('job-squid--view-goals', state + '');
    this.viewGoals$.next(state);
  };

  readonly activePage = this.activePageSignal.asReadonly();

  setActivePage = (page: string, setLocalStorage: boolean = true): void => {
    this.activePageSignal.set(page);
    if (setLocalStorage === true) {
      this.localstorage.setItem('job-squid--active-page', page);
    }
  };
}
