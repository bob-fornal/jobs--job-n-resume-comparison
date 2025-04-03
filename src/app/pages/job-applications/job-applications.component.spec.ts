import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationsComponent } from './job-applications.component';

import { MockApplicationsTableComponent } from '../../shared/_specs/components/mock-applications-table.spec'

describe('JobApplicationsComponent', () => {
  let component: JobApplicationsComponent;
  let fixture: ComponentFixture<JobApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        JobApplicationsComponent,

        MockApplicationsTableComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
