import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermGoal } from '../../core/interfaces/structure-goals.interface';

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

  it('expects "handleGoalsEffect" to set goals', () => {
    const value: Array<LongTermGoal> = [
      {
        title: 'TITLE',
        active: false,
        description: 'DESCRIPTION',
        summary: 'SUMMARY',
        checklist: [],
      },
    ];
    spyOn(component['service'], 'structure').and.returnValue(value);

    component.handleGoalsEffect();
    expect(component.goals).toEqual(value);
  });
});
