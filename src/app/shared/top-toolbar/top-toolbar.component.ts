import { Component, effect } from '@angular/core';

import { TopToolbarService } from './top-toolbar.service';

@Component({
  selector: 'top-toolbar',
  standalone: false,
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.css'
})
export class TopToolbarComponent {
  dark_enabled = false;

  _document: any = document;

  viewGoals = false;

  selectedPageMenu = 'resumes';

  constructor(
    private service: TopToolbarService,
  ) {
    this.initDarkMode();

    effect(this.handleViewGoalsEffect.bind(this));
  }

  initDarkMode = async (): Promise<void> => {
    this.dark_enabled = await this.service.getDarkMode();

    if (this.dark_enabled === true) {
      const element = this._document.getElementById('body');
      element?.classList.add('dark-mode');  
    }
  };

  handleViewGoalsEffect = (): void => {
    const viewGoals: boolean = this.service.viewGoals();
    this.viewGoals = viewGoals;
  };

  toggleDarkMode = (): void => {
    this.dark_enabled = !this.dark_enabled;
    this.service.setDarkMode(this.dark_enabled);

    const element = this._document.getElementById('body');
    element?.classList.toggle('dark-mode');
  };

  pageSelectedFn = this.pageSelected.bind(this);
  pageSelected(page: string): void {
    this.selectedPageMenu = page;
  }
}
