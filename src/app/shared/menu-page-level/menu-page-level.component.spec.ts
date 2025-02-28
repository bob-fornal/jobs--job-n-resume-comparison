import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPageLevelComponent } from './menu-page-level.component';
import { NavigationEnd } from '@angular/router';

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

  it('expects "checkForNavigationEnd" to return true if NavigationEnd', () => {
    const event: any = new NavigationEnd(1, '/test', '/test');

    const result: boolean = component.checkForNavigationEnd(event);
    expect(result).toEqual(true);
  });

  it('expects "checkForNavigationEnd" to return false if not NavigationEnd', () => {
    const event: any = null;

    const result: boolean = component.checkForNavigationEnd(event);
    expect(result).toEqual(false);
  });

  it('expects "handleNavigationEnd" to set page level active to face if on the about page', () => {
    const event: any = {
      url: '/about',
    };
    component.pageLevelActive = true;

    component.handleNavigationEnd(event);
    expect(component.pageLevelActive).toEqual(false);
  });

  it('expects "handleNavigationEnd" to set page level active to true if not documentation', () => {
    const event: any = {
      url: 'not-doc/',
    };
    component.pageLevelActive = false;

    component.handleNavigationEnd(event);
    expect(component.pageLevelActive).toEqual(true);
  });

  it('expects "handleNavigationEnd" to set page level active to false if documentation', () => {
    const event: any = {
      url: 'documentation/',
    };
    component.pageLevelActive = true;

    component.handleNavigationEnd(event);
    expect(component.pageLevelActive).toEqual(false);
  });

  it('expects "isActivePage" to check for selected page menu', () => {
    component.selectedPageMenu = 'BOB';
    component.activePages = [...component.activePages, 'BOB'];

    const result: boolean = component.isActivePage();
    expect(result).toEqual(true);
  });

  it('expects "menuItemSelected" to trigger set menu item in service', () => {
    const page = 'PAGE';
    const item = 'ITEM';
    spyOn(component['service'], 'setMenuItem').and.stub();

    component.menuItemSelected(page, item);
    expect(component['service'].setMenuItem).toHaveBeenCalledWith(page, item);
  });

  it('expects "documentationSelected" to navigate to a navigation page', () => {
    const page = 'TEST-PAGE';
    const route = '/documentation/TEST-PAGE';
    component.navigation[page] = route;
    spyOn(component['router'], 'navigateByUrl').and.stub();

    component.documentationSelected(page);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith(route);
  });

  it('expects "updateViewGoals" to store the state', () => {
    const viewGoals = true;
    spyOn(component['service'], 'setViewGoals').and.stub();

    component.updateViewGoals(viewGoals);
    expect(component['service'].setViewGoals).toHaveBeenCalledWith(viewGoals);
  });
});
