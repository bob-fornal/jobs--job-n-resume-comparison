import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemImageComponent } from './item-image.component';

describe('ItemImageComponent', () => {
  let component: ItemImageComponent;
  let fixture: ComponentFixture<ItemImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "isAprilFoolsDay" to return false if not April first', () => {
    jasmine.clock().install();
    const specificDate = new Date('2025-04-02T10:00:00.000Z');
    jasmine.clock().mockDate(specificDate);

    const result: boolean = component.isAprilFoolsDay();
    expect(result).toEqual(false);
    jasmine.clock().uninstall();
  });

  it('expects "isAprilFoolsDay" to return true if April first', () => {
    jasmine.clock().install();
    const specificDate = new Date('2025-04-01T10:00:00.000Z');
    jasmine.clock().mockDate(specificDate);

    const result: boolean = component.isAprilFoolsDay();
    expect(result).toEqual(true);
    jasmine.clock().uninstall();
  });

  it('expects "getItemNote" to return just the note if not April first', () => {
    spyOn(component, 'isAprilFoolsDay').and.returnValue(false);
    component.item.note = 'NOTE';

    const result: string = component.getItemNote();
    expect(result).toEqual('NOTE');
  });

  it('expects "getItemNote" to return message & note if April first', () => {
    spyOn(component, 'isAprilFoolsDay').and.returnValue(true);
    component.item.note = 'NOTE';

    const result: string = component.getItemNote();
    expect(result).toEqual('"I\'m sorry Dave, I\'m afraid I can\'t do that."\n\nNOTE');
  });
});
