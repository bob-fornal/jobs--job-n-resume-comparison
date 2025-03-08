import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationLongTermGoalsComponent } from './documentation-long-term-goals.component';

describe('DocumentationLongTermGoalsComponent', () => {
  let component: DocumentationLongTermGoalsComponent;
  let fixture: ComponentFixture<DocumentationLongTermGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentationLongTermGoalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentationLongTermGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
