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

  it('expects "textareaAdjust" to adjust height for a non-native element', () => {
    const event: any = {
      nativeElement: {
        scrollHeight: 100,
        style: {
          height: '',
        },
      },
    };

    component.textareaAdjust(event, true);
    expect(event.nativeElement.style.height).toEqual('116px');
  });

  it('expects "textareaAdjust" to adjust height for a native element', () => {
    const event: any = {
      target: {
        scrollHeight: 200,
        style: {
          height: '',
        },
      },
    };

    component.textareaAdjust(event);
    expect(event.target.style.height).toEqual('216px');
  });

  it('expects "doesValidationDisable" to return true of resumeNameLength is true', () => {
    component.validationChecks['resumeNameLength'] = true;
    component.validationChecks['resumeContentLength'] = false;

    const result: boolean = component.doesValidationDisable();
    expect(result).toEqual(true);
  });

  it('expects "doesValidationDisable" to return true of resumeContentLength is true', () => {
    component.validationChecks['resumeNameLength'] = false;
    component.validationChecks['resumeContentLength'] = true;

    const result: boolean = component.doesValidationDisable();
    expect(result).toEqual(true);
  });

  it('expects "isRunComparisonDisabled" to return true of doesValidationDisable is true', () => {
    component.validationChecks['jobContentLength'] = false;
    spyOn(component, 'doesValidationDisable').and.returnValue(true);

    const result: boolean = component.isRunComparisonDisabled();
    expect(result).toEqual(true);
  });

  it('expects "isRunComparisonDisabled" to return true of jobContentLength is true', () => {
    component.validationChecks['jobContentLength'] = true;
    spyOn(component, 'doesValidationDisable').and.returnValue(false);

    const result: boolean = component.isRunComparisonDisabled();
    expect(result).toEqual(true);
  });
});
