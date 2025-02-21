import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationCompareResumeComponent } from './documentation-compare-resume.component';

describe('DocumentationCompareResumeComponent', () => {
  let component: DocumentationCompareResumeComponent;
  let fixture: ComponentFixture<DocumentationCompareResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationCompareResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentationCompareResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
