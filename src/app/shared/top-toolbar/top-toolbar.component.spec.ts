import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopToolbarComponent } from './top-toolbar.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MockMenuApplicationComponent } from '../_specs/components/mock-menu-application.spec';
import { MockMenuPageLevelComponent } from '../_specs/components/mock-menu-page-level.spec';

describe('TopToolbarComponent', () => {
  let component: TopToolbarComponent;
  let fixture: ComponentFixture<TopToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
      ],
      declarations: [
        TopToolbarComponent,

        MockMenuApplicationComponent,
        MockMenuPageLevelComponent,
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

  it('expects "initDarkMode" to handle dark mode not emabled', async () => {
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
    spyOn(component['service'], 'getDarkMode').and.resolveTo(false);

    await component.initDarkMode();
    expect(_document.getElementById).not.toHaveBeenCalled();
    expect(classList.add).not.toHaveBeenCalled();
  });

  it('expects "initDarkMode" to handle dark mode emabled', async () => {
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
    spyOn(component['service'], 'getDarkMode').and.resolveTo(true);

    await component.initDarkMode();
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

  it('expects "pageSelected" to set the active page', () => {
    const page: string = 'PAGE';
    component.selectedPageMenu = '';

    component.pageSelected(page);
    expect(component.selectedPageMenu).toEqual(page);
  });
});
