import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  private document: any = window.document;
  private location: any = window.location;

  private environments: any = [
    { search: 'localhost', icon: 'favicon--localhost.ico' },
    { search: 'dev', icon:  'favicon--dev.ico' },
    { search: 'pre-prod', icon:  'favicon--pre-prod.ico' },
    { search: 'production', icon:  'favicon--prod.ico' },
  ];
  
  constructor() {
    document.querySelector

    const faviconElement = this.document.querySelector('#favicon');
    const url: string = this.location.href;
    console.log(faviconElement);
    console.log(url);

    for (let i = 0, len = this.environments.length; i < len; i++) {
      const environment = this.environments[i];
      if (environment.search === 'production') {
        faviconElement.href = environment.icon;
      } else {
        if (url.includes(environment.search)) {
          faviconElement.href = environment.icon;
          break;
        }
      }
    }
  }
}
