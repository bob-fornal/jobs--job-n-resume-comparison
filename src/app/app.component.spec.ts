import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  let app: any;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),

        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
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
    app._document = _document;
    spyOn(_document, 'getElementById').and.callThrough();
    spyOn(classList, 'add').and.stub();
    spyOn(app.storage, 'getDarkMode').and.returnValue(false);

    app.init();
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
    app._document = _document;
    spyOn(_document, 'getElementById').and.callThrough();
    spyOn(classList, 'add').and.stub();
    spyOn(app.storage, 'getDarkMode').and.returnValue(true);

    app.init();
    expect(_document.getElementById).toHaveBeenCalledWith('body');
    expect(classList.add).toHaveBeenCalledWith('dark-mode');
  });
});
