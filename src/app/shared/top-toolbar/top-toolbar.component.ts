import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TopToolbarService } from './top-toolbar.service';

@Component({
  selector: 'top-toolbar',
  standalone: false,
  templateUrl: './top-toolbar.component.html',
  styleUrl: './top-toolbar.component.css'
})
export class TopToolbarComponent {
  dark_enabled: boolean = false;

  _document: any = document;

  viewGoals: boolean = false;

  selectedPageMenu: string = 'resumes';

  constructor(
    private service: TopToolbarService,
  ) {
    this.init();
  }

  init = (): void => {
    this.initDarkMode();
    this.initViewGoals();
  };

  initDarkMode = (): void => {
    this.dark_enabled = this.service.getDarkMode();

    if (this.dark_enabled === true) {
      const element = this._document.getElementById('body');
      element?.classList.add('dark-mode');  
    }
  };

  initViewGoals = (): void => {
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
    console.log(page);
  }
}
