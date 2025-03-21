import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FeatureFlagsService } from '../../core/services/feature-flags.service';
import { TopToolbarService } from '../top-toolbar/top-toolbar.service';

import pageMenuList from '../../core/constants/page-menu-list.json';
import { PageMenuItem } from '../../core/interfaces/page-menu-item.interface';

@Component({
  selector: 'menu-application',
  standalone: false,
  
  templateUrl: './menu-application.component.html',
})
export class MenuApplicationComponent {

  @Input() pageSelectedFn: any = () => ({});

  pageMenuList: Array<PageMenuItem> = pageMenuList;

  selectedPageMenu = 'resumes';

  setTimeout: any = window.setTimeout;

  constructor(
    private features: FeatureFlagsService,
    private router: Router,
    private service: TopToolbarService,
  ) {}

  isFeatureActive = (key: string): boolean => {
    return this.features.showFeature(key)
  };

  pageMenuSelection = (page: string): void => {
    this.selectedPageMenu = page;
    this.pageSelectedFn(page);
    this.service.setActivePage(page);
    this.router.navigateByUrl(`/${page}`);
  };

  getTestId = (menuItem: PageMenuItem) => {
    const item = menuItem.path.replace('/', '');
    return `button--application-menu--${item}`;
  };
}
