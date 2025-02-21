import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FaviconService } from './core/services/favicon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  
  constructor(
    faviconService: FaviconService,
  ) {
    faviconService.init();
  }
}
