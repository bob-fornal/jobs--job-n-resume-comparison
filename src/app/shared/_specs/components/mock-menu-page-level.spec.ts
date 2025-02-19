import { Component, Input } from '@angular/core';

@Component({
  selector: 'menu-page-level',
  template: '<h1>title</h1>',
  standalone: false,
})
export class MockMenuPageLevelComponent {
  @Input('selectedPageMenu') selectedPageMenu: string = '';
  @Input('viewGoals') viewGoals: boolean = false;
}
