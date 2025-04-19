import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternsAddEditComponent } from './patterns-add-edit.component';

describe('PatternsAddEditComponent', () => {
  let component: PatternsAddEditComponent;
  let fixture: ComponentFixture<PatternsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatternsAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
