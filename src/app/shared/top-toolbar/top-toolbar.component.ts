import { Component } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
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

  selectedPageMenu: string = 'resumes';
  viewGoals: boolean = false;

  constructor(
    private router: Router,
    private service: TopToolbarService,
  ) {
    this.init();
  }

  init = (): void => {
    this.initDarkMode();
    this.initActivePage();
    this.initViewGoals();
  };

  initDarkMode = (): void => {
    this.dark_enabled = this.service.getDarkMode();

    if (this.dark_enabled === true) {
      const element = this._document.getElementById('body');
      element?.classList.add('dark-mode');  
    }
  };

  initActivePage = (): void => {
    const page: string = this.service.activePage();
    this.pageMenuSelection(page);
  };

  initViewGoals = (): void => {
    const viewGoals: boolean = this.service.viewGoals();
    this.viewGoals = viewGoals;
    console.log('initViewGoals', viewGoals);
  };

  toggleDarkMode = (): void => {
    this.dark_enabled = !this.dark_enabled;
    this.service.setDarkMode(this.dark_enabled);

    const element = this._document.getElementById('body');
    element?.classList.toggle('dark-mode');
  };

  pageMenuSelection = (page: string): void => {
    this.selectedPageMenu = page;
    this.service.setActivePage(page);
    this.router.navigateByUrl(`/${page}`);
  };

  updateViewGoals = (viewGoals: boolean): void => {
    // this.viewGoals = viewGoals;
    this.service.setViewGoals(viewGoals);
  };
}
