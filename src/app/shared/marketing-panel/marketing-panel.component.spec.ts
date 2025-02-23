import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingPanelComponent } from './marketing-panel.component';

describe('MarketingPanelComponent', () => {
  let component: MarketingPanelComponent;
  let fixture: ComponentFixture<MarketingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketingPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
