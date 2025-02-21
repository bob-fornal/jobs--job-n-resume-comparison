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
});
