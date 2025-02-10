import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysOfCodeComponent } from './days-of-code.component';

import { MockItemImageComponent } from '../../shared/_specs/components/mock-item-image.spec';

describe('DaysOfCodeComponent', () => {
  let component: DaysOfCodeComponent;
  let fixture: ComponentFixture<DaysOfCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DaysOfCodeComponent,

        MockItemImageComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysOfCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
