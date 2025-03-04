import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { TopToolbarService } from '../top-toolbar/top-toolbar.service';

@Component({
  selector: 'menu-page-level',
  standalone: false,
  
  templateUrl: './menu-page-level.component.html',
})
export class MenuPageLevelComponent {

  @Input() selectedPageMenu = '';
  @Input() viewGoals = false;

  activePages: Array<string> = [
    'about',
    'long-term-goals',
    'resumes',
    'days-of-code'
  ];
  navigation: Array<string> = [
    '/days-of-code',
    '/long-term-goals',
    '/resumes',
  ];

  pageLevelActive = true;
  routeChange$: any;

  constructor(
    private router: Router,
    private service: TopToolbarService,
  ) {
    this.handleRouteChanges();
  }

  handleRouteChanges = (): void => {
    this.router.events
      .pipe(filter(this.checkForNavigationEnd.bind(this)))
      .subscribe(this.handleNavigationEnd.bind(this));
  };

  checkForNavigationEnd = (event: any): boolean => {
    return event instanceof NavigationEnd;
  };

  handleNavigationEnd = (event: any) => {
    const regex = /^\/([^/]*)/gm;
    const result = regex.exec(event.url);
    this.selectedPageMenu = result![1];
    console.log(this.selectedPageMenu);

    if (event.url.includes('/about')) {
      this.pageLevelActive = false;
      return;
    }

    let isActive = false;
    this.navigation.forEach((page: string) => {
      if (event.url === page) {
        isActive = true;
      }
    });
    this.pageLevelActive = isActive;
  }

  menuItemSelected = (page: string, item: string): void => {
    this.service.setMenuItem(page, item);
  };

  documentationSelected = (page: string): void => {
    this.router.navigateByUrl(`/documentation/${page}`);
  };

  updateViewGoals = (viewGoals: boolean): void => {
    this.service.setViewGoals(viewGoals);
  };
}
