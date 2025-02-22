import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { TopToolbarService } from '../top-toolbar/top-toolbar.service';
import { filter } from 'rxjs';

@Component({
  selector: 'menu-page-level',
  standalone: false,
  
  templateUrl: './menu-page-level.component.html',
})
export class MenuPageLevelComponent {

  @Input('selectedPageMenu') selectedPageMenu: string = '';
  @Input('viewGoals') viewGoals: boolean = false;

  activePages: Array<string> = ['resumes', 'days-of-code'];

  pageLevelActive: boolean = true;
  routeChange$: any;
  navigation: { [page: string]: string } = {
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
