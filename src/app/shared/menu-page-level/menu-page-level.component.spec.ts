import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPageLevelComponent } from './menu-page-level.component';

describe('MenuPageLevelComponent', () => {
  let component: MenuPageLevelComponent;
  let fixture: ComponentFixture<MenuPageLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuPageLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPageLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "updateViewGoals" to store the state', () => {
    const viewGoals: boolean = true;
    spyOn(component['service'], 'setViewGoals').and.stub();

    component.updateViewGoals(viewGoals);
    expect(component['service'].setViewGoals).toHaveBeenCalledWith(viewGoals);
  });

  it('expects "menuItemSelected" to trigger set menu item in service', () => {
    const page: string = 'PAGE';
    const item: string = 'ITEM';
    spyOn(component['service'], 'setMenuItem').and.stub();

    component.menuItemSelected(page, item);
    expect(component['service'].setMenuItem).toHaveBeenCalledWith(page, item);
  });
});
