import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationDaysOfCodeComponent } from './documentation-days-of-code.component';

describe('DocumentationDaysOfCodeComponent', () => {
  let component: DocumentationDaysOfCodeComponent;
  let fixture: ComponentFixture<DocumentationDaysOfCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationDaysOfCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentationDaysOfCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "back" to navigate to /days-of-code', () => {
    spyOn(component['router'], 'navigateByUrl').and.stub();

    component.back();
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/days-of-code');
  });
});
