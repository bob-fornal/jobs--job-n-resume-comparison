import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewResearchComponent } from './interview-research.component';

describe('InterviewResearchComponent', () => {
  let component: InterviewResearchComponent;
  let fixture: ComponentFixture<InterviewResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewResearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
