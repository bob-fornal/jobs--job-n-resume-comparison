
import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-image',
  template: '<h1>title</h1>',
  standalone: false,
})
export class MockItemImageComponent {
  @Input('item') item: any = { number: -1, note: '', done: false };
}
