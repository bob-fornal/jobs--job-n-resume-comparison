import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSquidTablePagingComponent } from './job-squid-table-paging.component';

describe('JobSquidTablePagingComponent', () => {
  let component: JobSquidTablePagingComponent;
  let fixture: ComponentFixture<JobSquidTablePagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobSquidTablePagingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSquidTablePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
