import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AddEditJobApplicationsComponent } from './add-edit-job-applications.component';

const mockActivatedRoute: any = {
  paramMap: of({ get: (key: string) => 'mockValue' }),
  queryParamMap: of({ get: (key: string) => 'mockQueryValue' }),
  snapshot: {
    params: {
      type: 'add',
    },
    paramMap: { get: (key: string) => 'mockSnapshotValue' },
    queryParamMap: { get: (key: string) => 'mockSnapshotQueryValue' },
  },
  data: of({ key: 'mockData' })
};

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('AddEditJobApplicationsComponent', () => {
  let component: AddEditJobApplicationsComponent;
  let fixture: ComponentFixture<AddEditJobApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,

        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
      declarations: [
        AddEditJobApplicationsComponent,
      ],
      providers: [
        provideAnimationsAsync(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
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
