import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSquidTablePagingComponent } from './job-squid-table-paging.component';

import { MatIconModule } from '@angular/material/icon';

describe('JobSquidTablePagingComponent', () => {
  let component: JobSquidTablePagingComponent;
  let fixture: ComponentFixture<JobSquidTablePagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
      ],
      declarations: [
        JobSquidTablePagingComponent,
      ],
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
