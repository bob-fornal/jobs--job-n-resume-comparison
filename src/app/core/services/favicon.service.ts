import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FaviconService {

  private document: any = window.document;
  private location: any = window.location;

  private environments: any = {
    'localhost': 'favicon--localhost.ico',
    'dev': 'favicon--dev.ico',
    'pre-prod': 'favicon--pre-prod.ico',
    'production': 'favicon--prod.ico',
  };

  public init = (): void => {
    const faviconElement = this.document.querySelector('#favicon');
    const url: string = this.location.href;

    const environment: string = this.getEnvironment(url);
    faviconElement.href = this.environments[environment];
  };

  private getEnvironment = (url: string): string => {
    switch (true) {
      case url.includes('localhost'):
        return 'localhost';
      case url.includes('dev.'):
        return 'dev';
      case url.includes('pre-prod.'):
        return 'pre-prod';
      default:
        return 'production';
    }
  };
}
