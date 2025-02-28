import { Component, Input } from '@angular/core';

@Component({
  selector: 'menu-application',
  template: '<h1>title</h1>',
  standalone: false,
})
export class MockMenuApplicationComponent {
  @Input() pageSelectedFn: any = () => ({});
}
