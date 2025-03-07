import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtgChecklistModalComponent } from './ltg-checklist-modal.component';

describe('LtgChecklistModalComponent', () => {
  let component: LtgChecklistModalComponent;
  let fixture: ComponentFixture<LtgChecklistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LtgChecklistModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LtgChecklistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
