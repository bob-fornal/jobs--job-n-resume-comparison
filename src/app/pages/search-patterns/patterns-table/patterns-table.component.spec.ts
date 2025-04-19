import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternsTableComponent } from './patterns-table.component';

describe('PatternsTableComponent', () => {
  let component: PatternsTableComponent;
  let fixture: ComponentFixture<PatternsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatternsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
