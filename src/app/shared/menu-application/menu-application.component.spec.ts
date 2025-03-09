import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { MenuApplicationComponent } from './menu-application.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { MockFeatureFlagService } from '../_specs/services/mock-feature-flag-service.spec';
import { FeatureFlagsService } from '../../core/services/feature-flags.service';

describe('MenuApplicationComponent', () => {
  let component: MenuApplicationComponent;
  let fixture: ComponentFixture<MenuApplicationComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
    events: of(),
    root: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule,

        MatDividerModule,
        MatIconModule,
        MatMenuModule,
      ],
      declarations: [
        MenuApplicationComponent
      ],
      providers: [
        { provide: FeatureFlagsService, useValue: MockFeatureFlagService },
        { provide: Router, useValue: mockRouter },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "pageMenuSelection" to set the page and navigate', () => {
    const page = 'PAGE';
    component.selectedPageMenu = '';
    spyOn(component['service'], 'setActivePage').and.stub();

    component.pageMenuSelection(page);
    expect(component.selectedPageMenu).toEqual(page);
    expect(component['service'].setActivePage).toHaveBeenCalledWith(page);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith(`/${page}`);
  });
});
