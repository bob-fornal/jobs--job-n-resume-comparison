import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { mockRouter } from '../_specs/mock-router.spec';

import { MenuPageLevelComponent } from './menu-page-level.component';

describe('MenuPageLevelComponent', () => {
  let component: MenuPageLevelComponent;
  let fixture: ComponentFixture<MenuPageLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
      ],
      declarations: [
        MenuPageLevelComponent
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
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

  it('expects "handleNavigationEnd" to set page level not active to face if on the about page', () => {
    const event: any = {
      url: '/about',
    };
    component.pageLevelActive = true;

    component.handleNavigationEnd(event);
    expect(component.pageLevelActive).toEqual(false);
  });

  it('expects "handleNavigationEnd" to set page level active to face if on the about page', () => {
    const event: any = {
      url: '/',
    };
    component.pageLevelActive = false;

    component.handleNavigationEnd(event);
    expect(component.pageLevelActive).toEqual(true);
  });

  it('expects "handleNavigationEnd" to get the route and set page level active if in list', () => {
    const event: any = {
      url: '/resumes',
    };
    component.pageLevelActive = false;

    component.handleNavigationEnd(event);
    expect(component.pageLevelActive).toEqual(true);
  });

  it('expects "handleNavigationEnd" to get the route and set page level inactive if not in list', () => {
    const event: any = {
      url: '/documentation',
    };
    component.pageLevelActive = false;

    component.handleNavigationEnd(event);
    expect(component.pageLevelActive).toEqual(false);
  });

  it('expects "menuItemSelected" to trigger set menu item in service', () => {
    const page = 'PAGE';
    const item = 'ITEM';
    spyOn(component['service'], 'setMenuItem').and.stub();

    component.menuItemSelected(page, item);
    expect(component['service'].setMenuItem).toHaveBeenCalledWith(page, item);
  });

  it('expects "documentationSelected" to navigate to a navigation page', () => {
    const page = '/documentation/TEST-PAGE';
    component.navigation.push(page);
    spyOn(component['router'], 'navigateByUrl').and.stub();

    component.documentationSelected(page);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith(`/documentation/${page}`);
  });

  it('expects "updateViewGoals" to store the state', () => {
    const viewGoals = true;
    spyOn(component['service'], 'setViewGoals').and.stub();

    component.updateViewGoals(viewGoals);
    expect(component['service'].setViewGoals).toHaveBeenCalledWith(viewGoals);
  });
});
