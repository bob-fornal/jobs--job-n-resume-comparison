import { Component } from '@angular/core';
import { StorageService } from './core/services/storage.service';
import { Router } from '@angular/router';
import { ToolbarService } from './core/services/toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  dark_enabled: boolean = false;

  _document: any = document;

  selectedPageMenu: string = 'resumes';
  viewGoals: boolean = false;

  constructor(
    private router: Router,
    private storage: StorageService,
    private toolbarService: ToolbarService,
  ) {
    this.init();
  }

  init = (): void => {
    this.initDarkMode();
    this.initActivePage();
    this.initViewGoals();
  };

  initDarkMode = (): void => {
    this.dark_enabled = this.storage.getDarkMode();

    if (this.dark_enabled === true) {
      const element = this._document.getElementById('body');
      element?.classList.add('dark-mode');  
    }
  };

  initActivePage = (): void => {
    const page: string = this.toolbarService.activePage();
    this.pageMenuSelection(page);
  };

  initViewGoals = (): void => {
    const viewGoals: boolean = this.toolbarService.viewGoals();
    this.viewGoals = viewGoals;
    console.log('initViewGoals', viewGoals);
  };

  toggleDarkMode = (): void => {
    this.dark_enabled = !this.dark_enabled;
    this.storage.setDarkMode(this.dark_enabled);

    const element = this._document.getElementById('body');
    element?.classList.toggle('dark-mode');
  };

  pageMenuSelection = (page: string): void => {
    this.selectedPageMenu = page;
    this.toolbarService.setActivePage(page);
    this.router.navigateByUrl(`/${page}`);
  };

  updateViewGoals = (viewGoals: boolean): void => {
    // this.viewGoals = viewGoals;
    this.toolbarService.setViewGoals(viewGoals);
  };
}
