
import { Component, Input } from '@angular/core';

import { Item } from '../../core/interfaces/item.interface';

@Component({
  selector: 'item-image',
  templateUrl: './item-image.component.html',
  standalone: false,
  styleUrls: ['./item-image.component.css']
})
export class ItemImageComponent {
  @Input() item: Item = { number: -1, note: '', done: false };

  isAprilFoolsDay = (): boolean => {
    const now: Date = new Date();
    return now.getMonth() === 3 && now.getDate() === 1;
  };

  getItemNote = (): string => {
    let note: string = this.item.note;

    if (this.isAprilFoolsDay()) {
      note = '"I\'m sorry Dave, I\'m afraid I can\'t do that."\n\n' + note;
    }
    return note;
  };
}
