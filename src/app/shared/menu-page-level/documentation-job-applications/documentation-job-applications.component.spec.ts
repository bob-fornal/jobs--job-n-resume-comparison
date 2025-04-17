import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationJobApplicationsComponent } from './documentation-job-applications.component';

describe('DocumentationJobApplicationsComponent', () => {
  let component: DocumentationJobApplicationsComponent;
  let fixture: ComponentFixture<DocumentationJobApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationJobApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentationJobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "back" to navigate to /job-applications', () => {
    spyOn(component['router'], 'navigateByUrl').and.stub();

    component.back();
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/job-applications');
  });
});
