import { Injectable, signal } from '@angular/core';
import { StorageLayerService } from '../../core/services/storage-layer.service';

@Injectable({
  providedIn: 'root'
})
export class TopToolbarService {

  private activePageSignal = signal('resumes');
  private viewGoalsSignal = signal(false);
  private menuItemSignal = signal({ page: '', item: '' });

  constructor(
    private storage: StorageLayerService,
  ) {
    this.init();
  }

  init = (): void => {
    this.initActivePage();
    this.initViewGoals();
  };

  initActivePage = async (): Promise<void> => {
    const activePage: any = await this.storage.getItem('toolbar', 'job-squid--active-page', false);
    if (activePage !== null) {
      this.setActivePage(activePage, false);
    }
  };

  initViewGoals = async (): Promise<void> => {
    const viewGoals: any = await this.storage.getItem('toolbar', 'job-squid--view-goals', false);
    this.viewGoalsSignal.set(viewGoals === null ? false : viewGoals);
  };

  getDarkMode = async (): Promise<boolean> => {
    const mode = await this.storage.getItem('toolbar', 'job-squid--dark-mode', false);
    if (mode === null) {
      this.storage.setItem('toolbar', 'job-squid--dark-mode', false, false);
      return false;
    } else {
      return mode === true;
    }
  };

  setDarkMode = async (mode: boolean): Promise<void> => {
    await this.storage.setItem('toolbar', 'job-squid--dark-mode', mode, false);
  };

  readonly viewGoals = this.viewGoalsSignal.asReadonly();

  setViewGoals = async (state: boolean): Promise<void> => {
    this.viewGoalsSignal.set(state);
    await this.storage.setItem('toolbar', 'job-squid--view-goals', state, false);
  };

  readonly activePage = this.activePageSignal.asReadonly();

  setActivePage = async (page: string, setLocalStorage: boolean = true): Promise<void> => {
    this.activePageSignal.set(page);
    if (setLocalStorage === true) {
      await this.storage.setItem('toolbar', 'job-squid--active-page', page, false);
    }
  };

  readonly menuItem = this.menuItemSignal.asReadonly();

  setMenuItem = (page: string, item: string): void => {
    this.menuItemSignal.set({ page, item });
  };
}
