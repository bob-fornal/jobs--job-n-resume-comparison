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
});
