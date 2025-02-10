import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { TopToolbarComponent } from './top-toolbar.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('TopToolbarComponent', () => {
  let component: TopToolbarComponent;
  let fixture: ComponentFixture<TopToolbarComponent>;

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
        MatToolbarModule,
      ],
      declarations: [
        TopToolbarComponent,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
      ],
      teardown: { destroyAfterEach: false },
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects init to handle dark mode not emabled', () => {
    const classList: any = {
      add: (param: any) => ({}),
      toggle: (param: any) => ({}),
    };
    const _document = {
      getElementById: (param: any) => {
        return { classList };
      },
    };
    component._document = _document;
    spyOn(_document, 'getElementById').and.callThrough();
    spyOn(classList, 'add').and.stub();
    spyOn(component['service'], 'getDarkMode').and.returnValue(false);

    component.init();
    expect(_document.getElementById).not.toHaveBeenCalled();
    expect(classList.add).not.toHaveBeenCalled();
  });

  it('expects init to handle dark mode emabled', () => {
    const classList: any = {
      add: (param: any) => ({}),
      toggle: (param: any) => ({}),
    };
    const _document = {
      getElementById: (param: any) => {
        return { classList };
      },
    };
    component._document = _document;
    spyOn(_document, 'getElementById').and.callThrough();
    spyOn(classList, 'add').and.stub();
    spyOn(component['service'], 'getDarkMode').and.returnValue(true);

    component.init();
    expect(_document.getElementById).toHaveBeenCalledWith('body');
    expect(classList.add).toHaveBeenCalledWith('dark-mode');
  });

  it('expects "toggleDarkMode" to set the state and store it', () => {
    const classList: any = {
      add: (param: any) => ({}),
      toggle: (param: any) => ({}),
    };
    const _document = {
      getElementById: (param: any) => {
        return { classList };
      },
    };
    component._document = _document;
    spyOn(_document, 'getElementById').and.callThrough();
    spyOn(classList, 'toggle').and.stub();
    spyOn(component['service'], 'setDarkMode').and.stub;
    component.dark_enabled = true;

    component.toggleDarkMode();
    expect(component.dark_enabled).toEqual(false);
    expect(component['service'].setDarkMode).toHaveBeenCalledWith(false)
    expect(_document.getElementById).toHaveBeenCalledWith('body');
    expect(classList.toggle).toHaveBeenCalledWith('dark-mode');
  });
});
