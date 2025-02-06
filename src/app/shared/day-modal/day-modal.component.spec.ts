import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayModalComponent } from './day-modal.component';

describe('DayModalComponent', () => {
  let component: DayModalComponent;
  let fixture: ComponentFixture<DayModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
