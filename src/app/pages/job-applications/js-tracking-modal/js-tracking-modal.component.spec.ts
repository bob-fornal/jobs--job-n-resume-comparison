import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsTrackingModalComponent } from './js-tracking-modal.component';

describe('JsTrackingModalComponent', () => {
  let component: JsTrackingModalComponent;
  let fixture: ComponentFixture<JsTrackingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JsTrackingModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsTrackingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
