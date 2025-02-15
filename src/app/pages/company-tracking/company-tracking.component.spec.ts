import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTrackingComponent } from './company-tracking.component';

describe('CompanyTrackingComponent', () => {
  let component: CompanyTrackingComponent;
  let fixture: ComponentFixture<CompanyTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
