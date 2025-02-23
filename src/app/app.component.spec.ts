import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { MockMarketingPanelComponent } from './shared/_specs/components/mock-marketing-panel.spec';
import { MockTopToolbarComponent } from './shared/_specs/components/mock-top-toolbar.spec';

import { FaviconService } from './core/services/favicon.service';
import { MockFaviconService } from './shared/_specs/services/mock-favicon-service.spec';

describe('AppComponent', () => {
  let app: any;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
      ],
      declarations: [
        AppComponent,

        MockMarketingPanelComponent,
        MockTopToolbarComponent,
      ],
      providers: [
        { provide: FaviconService, useValue: MockFaviconService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
