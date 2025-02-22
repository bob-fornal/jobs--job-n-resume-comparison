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

  it('expects "back" to navigate to /resumes', () => {
    spyOn(component['router'], 'navigateByUrl').and.stub();

    component.back();
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/resumes');
  });
});
