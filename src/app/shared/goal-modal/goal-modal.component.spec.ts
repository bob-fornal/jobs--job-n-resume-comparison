import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalModalComponent } from './goal-modal.component';

describe('GoalModalComponent', () => {
  let component: GoalModalComponent;
  let fixture: ComponentFixture<GoalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
