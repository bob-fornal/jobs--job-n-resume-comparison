import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mockMatDialogRef } from '../../../shared/_specs/mock-dialog-ref.spec';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { LongTermGoalsService } from '../long-term-goals.service';
import { MockLongTermGoalsService } from '../../../shared/_specs/services/mock-long-term-goals-service.spec';

import { LtgChecklistModalComponent } from './ltg-checklist-modal.component';

describe('LtgChecklistModalComponent', () => {
  let component: LtgChecklistModalComponent;
  let fixture: ComponentFixture<LtgChecklistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatIconModule,
      ],
      declarations: [
        LtgChecklistModalComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { index: -1 } },
        { provide: LongTermGoalsService, useValue: MockLongTermGoalsService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LtgChecklistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
