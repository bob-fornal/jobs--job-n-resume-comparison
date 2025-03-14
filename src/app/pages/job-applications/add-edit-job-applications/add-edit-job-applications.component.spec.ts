import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJobApplicationsComponent } from './add-edit-job-applications.component';

describe('AddEditJobApplicationsComponent', () => {
  let component: AddEditJobApplicationsComponent;
  let fixture: ComponentFixture<AddEditJobApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditJobApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditJobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
