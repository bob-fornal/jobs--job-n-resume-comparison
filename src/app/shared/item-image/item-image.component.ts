
import { Component, Input } from '@angular/core';

import { Item } from '../../core/interfaces/item.interface';

@Component({
  selector: 'item-image',
  templateUrl: './item-image.component.html',
  standalone: false,
  styleUrls: ['./item-image.component.css']
})
export class ItemImageComponent {
  @Input('item') item: Item = { number: -1, note: '', done: false };
}
