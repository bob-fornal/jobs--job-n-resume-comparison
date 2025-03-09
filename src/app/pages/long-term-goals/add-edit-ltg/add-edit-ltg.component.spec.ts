import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ActivatedRoute } from '@angular/router';
const mockActivatedRoute = {
  snapshot: {
    params: {
      type: 'edit',
      index: -1,
    },
  },
};

import { NgControl } from '@angular/forms';
const mockNgControl = {
  value: {},
  control: {
    setValue: () => ({}),
  }
} as unknown as NgControl;

import { AddEditLtgComponent } from './add-edit-ltg.component';

describe('AddEditLtgComponent', () => {
  let component: AddEditLtgComponent;
  let fixture: ComponentFixture<AddEditLtgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,

        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
      declarations: [
        AddEditLtgComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: NgControl, useValue: mockNgControl },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLtgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
