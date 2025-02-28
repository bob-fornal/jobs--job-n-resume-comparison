import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { TopToolbarService } from '../top-toolbar/top-toolbar.service';

import { NavigationList } from '../../core/interfaces/navigation-list.interface';

@Component({
  selector: 'menu-page-level',
  standalone: false,
  
  templateUrl: './menu-page-level.component.html',
})
export class MenuPageLevelComponent {

  @Input() selectedPageMenu = '';
  @Input() viewGoals = false;

  activePages: Array<string> = ['about', 'resumes', 'days-of-code'];

  pageLevelActive = true;
  routeChange$: any;
  navigation: NavigationList = {
    'resumes': '/documentation/resumes',
    'days-of-code': '/documentation/days-of-code',
  };

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
    if (event.url.includes('/about')) {
      this.pageLevelActive = false;
      return;
    }
    this.pageLevelActive = !event.url.includes('documentation/');
  }

  isActivePage = (): boolean => this.activePages.includes(this.selectedPageMenu);

  menuItemSelected = (page: string, item: string): void => {
    this.service.setMenuItem(page, item);
  };

  documentationSelected = (page: string): void => {
    this.router.navigateByUrl(this.navigation[page]);
  };

  updateViewGoals = (viewGoals: boolean): void => {
    this.service.setViewGoals(viewGoals);
  };
}
