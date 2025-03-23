import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JAViewTrackingComponent } from './ja-view-tracking.component';

describe('JAViewTrackingComponent', () => {
  let component: JAViewTrackingComponent;
  let fixture: ComponentFixture<JAViewTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JAViewTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JAViewTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
