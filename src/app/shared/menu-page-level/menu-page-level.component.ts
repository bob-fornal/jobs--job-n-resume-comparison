import { Component, Input } from '@angular/core';
import { TopToolbarService } from '../top-toolbar/top-toolbar.service';

@Component({
  selector: 'menu-page-level',
  standalone: false,
  
  templateUrl: './menu-page-level.component.html',
  styleUrl: './menu-page-level.component.css'
})
export class MenuPageLevelComponent {

  @Input('selectedPageMenu') selectedPageMenu: string = '';
  @Input('viewGoals') viewGoals: boolean = false;

  activePages: Array<string> = ['resumes', 'days-of-code'];

  constructor(
    private service: TopToolbarService,
  ) {}

  isActivePage = (): boolean => this.activePages.includes(this.selectedPageMenu);

  menuItemSelected = (page: string, item: string): void => {
    this.service.setMenuItem(page, item);
  };

  updateViewGoals = (viewGoals: boolean): void => {
    this.service.setViewGoals(viewGoals);
  };
}
