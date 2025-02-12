import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ModalIgnoreListComponent } from './modal-ignore-list.component';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('ModalIgnoreListComponent', () => {
  let component: ModalIgnoreListComponent;
  let fixture: ComponentFixture<ModalIgnoreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        
        MatButtonModule,
        MatDialogModule,
      ],
      declarations: [
        ModalIgnoreListComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: 'word1, word2, word3' },
        { provide: MatDialogRef, useValue: { close: () => ({}) } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalIgnoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "cancel" to only close the modal', () => {
    spyOn(component['dialogRef'], 'close').and.stub();

    component.cancel();
    expect(component['dialogRef'].close).toHaveBeenCalled();
  });

  it('expects "save" to close the modal and pass the note', () => {
    spyOn(component['dialogRef'], 'close').and.stub();
    component.ignoreList = 'test1, test2';

    component.save();
    expect(component['dialogRef'].close).toHaveBeenCalledWith('test1, test2');
  });
});
