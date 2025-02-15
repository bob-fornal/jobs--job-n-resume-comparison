import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FeatureFlagsService } from '../../core/services/feature-flags.service';
import { TopToolbarService } from '../top-toolbar/top-toolbar.service';

import pageMenuList from '../../core/constants/page-menu-list.json';
import { PageMenuItem } from '../../core/interfaces/page-menu-item.interface';

@Component({
  selector: 'application-menu',
  standalone: false,
  
  templateUrl: './application-menu.component.html',
})
export class ApplicationMenuComponent {

  @Input('pageSelectedFn') pageSelectedFn: any = () => {};

  pageMenuList: Array<PageMenuItem> = pageMenuList;

  selectedPageMenu: string = 'resumes';

  constructor(
    private features: FeatureFlagsService,
    private router: Router,
    private service: TopToolbarService,
  ) {
    this.init();
  }

  init = (): void => {
    this.initActivePage();
  };

  initActivePage = (): void => {
    const page: string = this.service.activePage();
    this.pageMenuSelection(page);
  };

  isFeatureActive = (key: string): boolean => {
    return this.features.showFeature(key)
  };

  pageMenuSelection = (page: string): void => {
    this.selectedPageMenu = page;
    this.pageSelectedFn(page);
    this.service.setActivePage(page);
    this.router.navigateByUrl(`/${page}`);
  };

}
