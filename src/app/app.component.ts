import { Component } from '@angular/core';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  dark_enabled: boolean = false;

  constructor(
    private storage: StorageService,
  ) {
    this.init();
  }

  init = (): void => {
    this.dark_enabled = this.storage.getDarkMode();

    if (this.dark_enabled === true) {
      const element = document.getElementById('body');
      element?.classList.add('dark-mode');  
    }
  };

  toggleDarkMode = (): void => {
    this.dark_enabled = !this.dark_enabled;
    this.storage.setDarkMode(this.dark_enabled);

    const element = document.getElementById('body');
    element?.classList.toggle('dark-mode');
  };
}
