import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CompareResumeComponent } from './compare-resume.component';

describe('CompareResumeComponent', () => {
  let component: CompareResumeComponent;
  let fixture: ComponentFixture<CompareResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
      ],
      declarations: [
        CompareResumeComponent,
      ],
      providers: [
        provideAnimationsAsync(),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "init" to trigger getResumes', () => {
    spyOn(component['storage'], 'getResumes').and.stub();

    component.init();
    expect(component['storage'].getResumes).toHaveBeenCalled();
  });
});
