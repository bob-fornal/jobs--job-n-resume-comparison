import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLtgComponent } from './add-edit-ltg.component';

describe('AddEditLtgComponent', () => {
  let component: AddEditLtgComponent;
  let fixture: ComponentFixture<AddEditLtgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditLtgComponent]
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
