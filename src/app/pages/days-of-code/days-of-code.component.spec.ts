import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysOfCodeComponent } from './days-of-code.component';

describe('DaysOfCodeComponent', () => {
  let component: DaysOfCodeComponent;
  let fixture: ComponentFixture<DaysOfCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DaysOfCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysOfCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
