import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ApplicationMenuComponent } from './application-menu.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

describe('ApplicationMenuComponent', () => {
  let component: ApplicationMenuComponent;
  let fixture: ComponentFixture<ApplicationMenuComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
    events: of(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,

        MatDividerModule,
        MatIconModule,
        MatMenuModule,
      ],
      declarations: [
        ApplicationMenuComponent
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "init" to trigger active page', () => {
    spyOn(component, 'initActivePage').and.stub();

    component.init();
    expect(component.initActivePage).toHaveBeenCalled();
  });

  it('expects "initActivePage" to set the active page', () => {
    spyOn(component['service'], 'activePage').and.returnValue('TEST-PAGE');
    spyOn(component, 'pageMenuSelection').and.stub();

    component.initActivePage();
    expect(component.pageMenuSelection).toHaveBeenCalledWith('TEST-PAGE');
  });

  it('expects "pageMenuSelection" to set the page and navigate', () => {
    const page: string = 'PAGE';
    component.selectedPageMenu = '';
    spyOn(component['service'], 'setActivePage').and.stub();

    component.pageMenuSelection(page);
    expect(component.selectedPageMenu).toEqual(page);
    expect(component['service'].setActivePage).toHaveBeenCalledWith(page);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith(`/${page}`);
  });
});
