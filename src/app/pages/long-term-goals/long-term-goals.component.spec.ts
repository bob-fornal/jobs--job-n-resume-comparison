import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermGoalsComponent } from './long-term-goals.component';

describe('LongTermGoalsComponent', () => {
  let component: LongTermGoalsComponent;
  let fixture: ComponentFixture<LongTermGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LongTermGoalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongTermGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
