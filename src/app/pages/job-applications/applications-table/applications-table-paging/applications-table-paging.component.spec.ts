import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsTablePagingComponent } from './applications-table-paging.component';

import { MatIconModule } from '@angular/material/icon';

describe('ApplicationsTablePagingComponent', () => {
  let component: ApplicationsTablePagingComponent;
  let fixture: ComponentFixture<ApplicationsTablePagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
      ],
      declarations: [
        ApplicationsTablePagingComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsTablePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
