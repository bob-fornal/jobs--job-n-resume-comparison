import { Component } from '@angular/core';
import { StorageService } from './core/services/storage.service';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router,
    private storage: StorageService,
  ) {
    this.init();
  }

  init = (): void => {
    this.dark_enabled = this.storage.getDarkMode();

    if (this.dark_enabled === true) {
      const element = this._document.getElementById('body');
      element?.classList.add('dark-mode');  
    }
  };

  toggleDarkMode = (): void => {
    this.dark_enabled = !this.dark_enabled;
    this.storage.setDarkMode(this.dark_enabled);

    const element = this._document.getElementById('body');
    element?.classList.toggle('dark-mode');
  };

  pageMenuSelection = (page: string): void => {
    this.selectedPageMenu = page;
    this.router.navigateByUrl(`/${page}`);
  };
}
