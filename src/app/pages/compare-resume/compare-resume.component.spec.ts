import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareResumeComponent } from './compare-resume.component';

describe('CompareResumeComponent', () => {
  let component: CompareResumeComponent;
  let fixture: ComponentFixture<CompareResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompareResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
