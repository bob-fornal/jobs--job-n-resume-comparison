import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CompareResumeComponent } from './compare-resume.component';
import { ResumeDetails } from '../../core/interfaces/resume-details.interface';

describe('CompareResumeComponent', () => {
  let component: CompareResumeComponent;
  let fixture: ComponentFixture<CompareResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
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

  it('expects "changeValidationState to set the state', () => {
    const key: string = 'jobContentLength';
    component.validationChecks[key] = true;
    const event: any = {
      target: {
        value: 'TESTING',
      },
    };
    const check: number = 5;

    component.changeValidationState(key, event, check);
    expect(component.validationChecks[key]).toEqual(false);
  });

  it('expects "triggerResumeNameValidation" to change state and check if name exists', () => {
    const event: any = { key: 'TEST' };
    spyOn(component, 'changeValidationState').and.stub();
    spyOn(component, 'checkIfResumeNameExists').and.stub();

    component.triggerResumeNameValidation(event);
    expect(component.changeValidationState).toHaveBeenCalledWith('resumeNameLength', event, 3);
    expect(component.checkIfResumeNameExists).toHaveBeenCalledWith(event);
  });

  it('expects "triggerResumeContentValidation" to change state', () => {
    const event: any = { key: 'TEST' };
    spyOn(component, 'changeValidationState').and.stub();

    component.triggerResumeContentValidation(event);
    expect(component.changeValidationState).toHaveBeenCalledWith('resumeContentLength', event, 5);
  });

  it('expects "triggerJobValidation" to set jobContentLength', () => {
    const event: any = {
      target: {
        value: '123',
      },
    };
    component.validationChecks['jobContentLength'] = true;

    component.triggerJobValidation(event);
    expect(component.validationChecks['jobContentLength']).toEqual(false);
  });

  it('expects "checkIfResumeNameExists" to return true', () => {
    const event: any = {
      target: {
        value: 'IT EXISTS',
      },
    };
    component.resumes = [
      { name: 'IT DOES NOT EXIST HERE', content: '', keywords: [] },
      { name: 'IT EXISTS', content: '', keywords: [] },
    ];
    component.validationChecks['resumeNameInList'] = false;
    spyOn(component['changeDetectorRef'], 'detectChanges').and.stub();

    component.checkIfResumeNameExists(event);
    expect(component.validationChecks['resumeNameInList']).toEqual(true);
  });

  it('expects "handleResumes" to set resumes', () => {
    const data: Array<ResumeDetails> = [
      { name: 'IT DOES NOT EXIST HERE', content: '', keywords: [] },
      { name: 'IT EXISTS', content: '', keywords: [] },
    ];
    component.resumes = [];

    component.handleResumes(data);
    expect(component.resumes).toEqual(data);
  });

  it('expects "deleteResume" to set resumes', () => {
    const deleteResume: ResumeDetails = { name: 'IT DOES NOT EXIST HERE', content: '', keywords: [] };
    const expected: Array<ResumeDetails> = [
      { name: 'IT EXISTS', content: '', keywords: [] },
    ];
    component.resumes = [
      { name: 'IT DOES NOT EXIST HERE', content: '', keywords: [] },
      { name: 'IT EXISTS', content: '', keywords: [] },
    ];

    component.deleteResume(deleteResume);
    expect(component.resumes).toEqual(expected);
  });

  it('expects "selectResume" to do nothing if delete selected', () => {
    const event: any = {
      target: {
        classList: ['delete-icon'],
      },
    };
    const resume: ResumeDetails = { name: 'NAME', content: 'CONTENT', keywords: [] };
    spyOn(component, 'textareaAdjust').and.stub();

    component.selectResume(event, resume);
    expect(component.textareaAdjust).not.toHaveBeenCalled();
  });

  it('expects "selectResume" to set name and content', () => {
    const event: any = {
      target: {
        classList: [],
      },
    };
    const resume: ResumeDetails = { name: 'NAME', content: 'CONTENT', keywords: [] };
    spyOn(component, 'textareaAdjust').and.stub();
    spyOn(component['changeDetectorRef'], 'detectChanges').and.stub();

    component.selectResume(event, resume);
    expect(component.textareaAdjust).toHaveBeenCalled();
  });

  it('expects "clearResumeDetails" to call selectResume with an empty record', () => {
    spyOn(component, 'selectResume').and.stub();

    component.clearResumeDetails();
    expect(component.selectResume).toHaveBeenCalledWith({}, { name: '', content: '', keywords: [] });
  });

  it('expects "onSubmit" to handle record creation', () => {
    const resumes: Array<ResumeDetails> = [
      { name: 'IT DOES NOT EXIST HERE', content: '', keywords: [] },
      { name: 'IT EXISTS', content: '', keywords: [] },
    ];
    component.resumes = resumes;
    component.resumeForm.patchValue({
      resumeName: undefined,
      resumeContent: undefined,
    });
    spyOn(component.keywordExtractor, 'extract').and.returnValue([]);
    spyOn(component['storage'], 'setResumes').and.stub();

    component.onSubmit();
    expect(component.keywordExtractor.extract).toHaveBeenCalled();
    expect(component['storage'].setResumes).toHaveBeenCalledWith([...resumes, { name: '', content: '', keywords: [] }]);
  });

  it('expects "onSubmit" to handle record overwrite', () => {
    const resumes: Array<ResumeDetails> = [
      { name: 'IT DOES NOT EXIST HERE', content: '', keywords: [] },
      { name: 'IT EXISTS', content: '', keywords: [] },
    ];
    component.resumes = resumes;
    component.resumeForm.patchValue({
      resumeName: 'IT EXISTS',
      resumeContent: 'CONTENT HERE',
    });
    spyOn(component.keywordExtractor, 'extract').and.returnValue(['CONTENT', 'HERE']);
    spyOn(component['storage'], 'setResumes').and.stub();
    const expected: Array<ResumeDetails> = [
      { name: 'IT DOES NOT EXIST HERE', content: '', keywords: [] },
      { name: 'IT EXISTS', content: 'CONTENT HERE', keywords: ['CONTENT', 'HERE'] },
    ];

    component.onSubmit();
    expect(component.keywordExtractor.extract).toHaveBeenCalled();
    expect(component['storage'].setResumes).toHaveBeenCalledWith(expected);
  });
});
