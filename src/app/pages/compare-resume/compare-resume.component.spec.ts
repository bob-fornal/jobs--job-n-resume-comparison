import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CompareResumeComponent } from './compare-resume.component';
import { ResumeDetails, ResumeForm } from '../../core/interfaces/resume-details.interface';
import { JobKeywords } from '../../core/interfaces/job-keywords.interface';

describe('CompareResumeComponent', () => {
  let component: CompareResumeComponent;
  let fixture: ComponentFixture<CompareResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,

        MatChipsModule,
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

  it('expects "emptyJobKeywords" to return an empty ojbect', () => {
    const expected: JobKeywords = {
      match: [],
      noMatch: [],
    };

    const result: JobKeywords = component['emptyJobKeywords']();
    expect(result).toEqual(expected);
  });

  it('expects "init" to trigger getResumes', () => {
    const mockSetTimeout = (fn: any, time: number) => fn();
    component.setTimeout = mockSetTimeout;
    spyOn(component['service'], 'getResumes').and.stub();
    spyOn(component, 'clearAll').and.stub();

    component.init();
    expect(component['service'].getResumes).toHaveBeenCalled();
    expect(component.clearAll).toHaveBeenCalled();
  });

  it('expects "clearAll" to reset resume, comparison, and jobs', () => {
    component.jobKeywords = { match: ['TEST1'], noMatch: ['TEST2'] };
    component.validationChecks = {
      resumeNameLength: false,
      resumeNameInList: false,
      resumeContentLength: false,
      jobContentLength: false,
    };
    spyOn(component, 'clearResumeDetails').and.stub();
    spyOn(component, 'clearJobDetails').and.stub();
    const expected: any = {
      resumeNameLength: true,
      resumeNameInList: false,
      resumeContentLength: true,
      jobContentLength: true,
    };

    component.clearAll();
    expect(component.jobKeywords).toEqual({ match: [], noMatch: [] });
    expect(component.clearResumeDetails).toHaveBeenCalled();
    expect(component.clearJobDetails).toHaveBeenCalled();
    expect(component.validationChecks).toEqual(expected);
  });

  it('expects "handleResumes" to set resumes', () => {
    const data: Array<ResumeDetails> = [
      { name: 'IT DOES NOT EXIST HERE', content: '', keywords: [] },
      { name: 'IT EXISTS', content: '', keywords: [] },
    ];
    component.resumes = [];
    spyOn(component['service'], 'resumes').and.returnValue(data);

    component.handleResumes();
    expect(component.resumes).toEqual(data);
  });

  it('expects "handleTriggerIgnoreListEffect" to do nothing if triggered', () => {
    spyOn(component['service'], 'triggerIgnoreList').and.returnValue('not-triggered');
    spyOn(component['service'], 'clearTriggerIgnoreList').and.stub();
    spyOn(component, 'openIgnoreListModal').and.stub();

    component.handleTriggerIgnoreListEffect();
    expect(component['service'].clearTriggerIgnoreList).not.toHaveBeenCalled();
    expect(component.openIgnoreListModal).not.toHaveBeenCalled();
  });

  it('expects "handleTriggerIgnoreListEffect" to open modal if triggered', () => {
    spyOn(component['service'], 'triggerIgnoreList').and.returnValue('triggered');
    spyOn(component['service'], 'clearTriggerIgnoreList').and.stub();
    spyOn(component, 'openIgnoreListModal').and.stub();

    component.handleTriggerIgnoreListEffect();
    expect(component['service'].clearTriggerIgnoreList).toHaveBeenCalled();
    expect(component.openIgnoreListModal).toHaveBeenCalled();
  });

  it('expects "handleTriggerImportEffect" to get inactive and do nothing', () => {
    spyOn(component['service'], 'triggerImport').and.returnValue('inactive');
    spyOn(component['service'], 'clearTriggerImport').and.stub();
    spyOn(component.fileUpload.nativeElement, 'click').and.stub();

    component.handleTriggerImportEffect();
    expect(component['service'].clearTriggerImport).not.toHaveBeenCalled();
    expect(component.fileUpload.nativeElement.click).not.toHaveBeenCalled();
  });

  it('expects "handleTriggerImportEffect" to handle active return', () => {
    spyOn(component['service'], 'triggerImport').and.returnValue('active');
    spyOn(component['service'], 'clearTriggerImport').and.stub();
    spyOn(component.fileUpload.nativeElement, 'click').and.stub();

    component.handleTriggerImportEffect();
    expect(component['service'].clearTriggerImport).toHaveBeenCalled();
    expect(component.fileUpload.nativeElement.click).toHaveBeenCalled();
  });

  it('expects "showMatchPercentage" to return false if matchPercentage not on resume', () => {
    const resume: ResumeDetails = { name: '', content: '', keywords: [] };

    const result: boolean = component.showMatchPercent(resume);
    expect(result).toEqual(false);
  });

  it('expects "showMatchPercentage" to return false if matchPercentage is null', () => {
    const resume: ResumeDetails = { name: '', content: '', keywords: [], matchPercent: null };

    const result: boolean = component.showMatchPercent(resume);
    expect(result).toEqual(false);
  });

  it('expects "showMatchPercentage" to return true if matchPercentage is a number', () => {
    const resume: ResumeDetails = { name: '', content: '', keywords: [], matchPercent: 10 };

    const result: boolean = component.showMatchPercent(resume);
    expect(result).toEqual(true);
  });

  it('expects "getRange" to return range-61-80 if value is in range', () => {
    const match = 72;

    const result: string = component.getRange(match);
    expect(result).toEqual('range-61-80');
  });

  it('expects "getRange" to return range-81-100 if value is in range', () => {
    const match = 92;

    const result: string = component.getRange(match);
    expect(result).toEqual('range-81-100');
  });

  it('expects "getRange" to return range-0-60 if value is in range', () => {
    const match = 42;

    const result: string = component.getRange(match);
    expect(result).toEqual('range-0-60');
  });

  it('expects "openIgnoreListModal" to open the modal', async () => {
    const list: Array<string> = ['test1', 'test2', 'test3'];
    spyOn(component['service'], 'getIgnoreList').and.resolveTo(list);
    const afterClosed: any = {
      subscribe: () => ({}),
    };
    const openResult: any = {
      afterClosed: () => (afterClosed),
    };
    spyOn(component['dialog'], 'open').and.returnValue(openResult as any);
    spyOn(afterClosed, 'subscribe').and.stub();

    await component.openIgnoreListModal();
    expect(component['dialog'].open).toHaveBeenCalledWith(jasmine.any(Function), { data: 'test1, test2, test3' });
    expect(afterClosed.subscribe).toHaveBeenCalled();
  });

  it('expects "handleIgnoreListModalClose" to handle undefined', () => {
    const listString: string | undefined = undefined;
    spyOn(component['service'], 'setDefaultIgnoreList').and.stub();

    component.handleIgnoreListModalClose(listString);
    expect(component['service'].setDefaultIgnoreList).not.toHaveBeenCalled();
  });

  it('expects "handleIgnoreListModalClose" to handle a string', () => {
    const listString: string | undefined = 'item1,  item2,item3';
    spyOn(component['service'], 'setDefaultIgnoreList').and.stub();

    component.handleIgnoreListModalClose(listString);
    expect(component['service'].setDefaultIgnoreList).toHaveBeenCalledWith(['item1', 'item2', 'item3']);
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
    const key = 'jobContentLength';
    component.validationChecks[key] = true;
    const event: any = {
      target: {
        value: 'TESTING',
      },
    };
    const check = 5;

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

  it('expects "getJobKeywords" to capture the string and extract the keywords', async () => {
    component.jobPosting.nativeElement.value = 'TEXT1 TEXT2 TEXT3 TEXT4';
    component.keywordExtractor = {
      extract: (content: string, settings: any) => ['TEXT1', 'TEXT3', 'TEXT4'],
    }
    const expected: Array<string> = ['TEXT1', 'TEXT4'];
    spyOn(component['service'], 'extractIgnoreList').and.resolveTo(expected);

    const result: Array<string> = await component.getJobKeywords();
    expect(result).toEqual(expected);
  });

  it('expects "adjustResumeContent" to remove comment text', () => {
    const content = '1\n## 2\n3';
    const expected = '1\n3';

    const result: string = component.adjustResumeContent(content);
    expect(result).toEqual(expected);
  });

  it('expects "getActiveResumeKeywords" to capture the string and extract the keywords', async () => {
    component.resumeContent.nativeElement.value = 'TEXT1 TEXT2 TEXT3 TEXT4';
    spyOn(component, 'adjustResumeContent').and.returnValue('TEXT1\nTEXT3\nTEXT4');
    component.keywordExtractor = {
      extract: (content: string, settings: any) => ['TEXT1', 'TEXT4'],
    }
    const expected: Array<string> = ['TEXT4'];
    spyOn(component['service'], 'extractIgnoreList').and.resolveTo(expected);

    const result: Array<string> = await component.getActiveResumeKeywords();
    expect(result).toEqual(expected);
  });

  it('expects "generateResumePercentages" to update resume percentages', () => {
    const resumes: Array<ResumeDetails> = [
      { name: 'TITLE1', content: 'TEXT1', keywords: ['1'] },
      { name: 'TITLE2', content: 'TEXT2', keywords: ['1', '2'] },
      { name: 'TITLE3', content: 'TEXT3', keywords: ['1', '2', '3'] },
    ];
    const expected: Array<ResumeDetails> = [
      { name: 'TITLE1', content: 'TEXT1', keywords: ['1'], matchPercent: 25 },
      { name: 'TITLE2', content: 'TEXT2', keywords: ['1', '2'], matchPercent: 50 },
      { name: 'TITLE3', content: 'TEXT3', keywords: ['1', '2', '3'], matchPercent: 75 },
    ];
    const keywords: Array<string> = ['1', '2', '3', '4'];
    component.resumes = resumes;

    component.generateResumePercentages(keywords);
    expect(component.resumes).toEqual(expected);
  });

  it('expects "runComparison" to generate percentages, compare active resume, and generate tokens', async () => {
    spyOn(component, 'getJobKeywords').and.resolveTo(['1', '2', '3', '4']);
    spyOn(component, 'generateResumePercentages').and.stub();
    spyOn(component, 'getActiveResumeKeywords').and.resolveTo(['2', '3']);

    await component.runComparison();
    expect(component.jobKeywords).toEqual({
      match: ['2', '3'],
      noMatch: ['1', '4'],
    });
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

  it('expects "deleteResume" to set resumes', () => {
    const deleteResume: ResumeDetails = { name: 'IT DOES NOT EXIST HERE', content: '', keywords: [] };
    const expected: Array<ResumeDetails> = [
      { name: 'IT EXISTS', content: '', keywords: [] },
    ];
    component.resumes = [
      { name: 'IT DOES NOT EXIST HERE', content: '', keywords: [] },
      { name: 'IT EXISTS', content: '', keywords: [] },
    ];
    const event: any = {
      stopPropagation: () => ({}),
    };
    spyOn(component['service'], 'setResumes').and.stub();

    component.deleteResume(event, deleteResume);
    expect(component['service'].setResumes).toHaveBeenCalledWith(expected);
  });

  it('expects "selectResume" to set name and content, no comparison', () => {
    const resume: ResumeDetails = { name: 'NAME', content: 'CONTENT', keywords: [] };
    spyOn(component, 'textareaAdjust').and.stub();
    spyOn(component['changeDetectorRef'], 'detectChanges').and.stub();
    spyOn(component, 'isRunComparisonDisabled').and.returnValue(true);
    spyOn(component, 'runComparison').and.stub();

    component.selectResume(resume);
    expect(component.textareaAdjust).toHaveBeenCalled();
    expect(component.runComparison).not.toHaveBeenCalled();
  });

  it('expects "selectResume" to set name and content, comparison', () => {
    const resume: ResumeDetails = { name: 'NAME', content: 'CONTENT', keywords: [] };
    spyOn(component, 'textareaAdjust').and.stub();
    spyOn(component['changeDetectorRef'], 'detectChanges').and.stub();
    spyOn(component, 'isRunComparisonDisabled').and.returnValue(false);
    spyOn(component, 'runComparison').and.stub();

    component.selectResume(resume);
    expect(component.textareaAdjust).toHaveBeenCalled();
    expect(component.runComparison).toHaveBeenCalled();
  });

  it('expects "clearResumeDetails" to call selectResume with an empty record', () => {
    spyOn(component, 'selectResume').and.stub();

    component.clearResumeDetails();
    expect(component.selectResume).toHaveBeenCalledWith({ name: '', content: '', keywords: [] });
  });

  it('expects "clearJobDetails" to clear the element', () => {
    component.jobPosting.nativeElement.value = 'TEST';

    component.clearJobDetails();
    expect(component.jobPosting.nativeElement.value).toEqual('');
  });

  it('expects "clearComparison" to reset job details and validation', () => {
    component.jobKeywords = {
      match: ['1', '2', '3'],
      noMatch: ['4', '5'],
    };
    component.validationChecks = {
      resumeNameLength: false,
      resumeNameInList: false,
      resumeContentLength: false,
      jobContentLength: false,
    };

    component.clearComparison();
    expect(component.jobKeywords).toEqual({ match: [], noMatch: [] });
    expect(component.validationChecks).toEqual({
      resumeNameLength: true,
      resumeNameInList: false,
      resumeContentLength: true,
      jobContentLength: true,
    });
  });

  it('expects "captureContent" to return name and content', () => {
    component.resumeForm.patchValue({
      resumeName: 'RESUME-NAME',
      resumeContent: 'RESUME-CONTENT',
    });
    const expected: ResumeForm = { name: 'RESUME-NAME', content: 'RESUME-CONTENT' };

    const result: ResumeForm = component.captureContent();
    expect(result).toEqual(expected);
  });

  it('expects "getKeywords" to return resume keywords', async () => {
    const content = 'TEST1 TEST2 TEST3 TEST4';
    const expected: Array<string> = ['TEST1', 'TEST4']
    spyOn(component, 'adjustResumeContent').and.returnValue('TEST1 TEST2 TEST4');
    spyOn(component.keywordExtractor, 'extract').and.returnValue(['TEST1', 'TEST2', 'TEST4']);
    spyOn(component['service'], 'extractIgnoreList').and.resolveTo(expected);
    
    const result: Array<string> = await component.getKeywords(content);
    expect(result).toEqual(expected);
  });

  it('expects "onSubmit" to handle record creation', async () => {
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
    spyOn(component['service'], 'setResumes').and.stub();

    await component.onSubmit();
    expect(component.keywordExtractor.extract).toHaveBeenCalled();
    expect(component['service'].setResumes).toHaveBeenCalledWith([...resumes, { name: '', content: '', keywords: [] }]);
  });

  it('expects "onSubmit" to handle record overwrite', async () => {
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
    spyOn(component['service'], 'setResumes').and.stub();
    const expected: Array<ResumeDetails> = [
      { name: 'IT DOES NOT EXIST HERE', content: '', keywords: [] },
      { name: 'IT EXISTS', content: 'CONTENT HERE', keywords: ['CONTENT', 'HERE'] },
    ];

    await component.onSubmit();
    expect(component.keywordExtractor.extract).toHaveBeenCalled();
    expect(component['service'].setResumes).toHaveBeenCalledWith(expected);
  });

  it('expects "toggleResumeWide" to set wideElement to an empty string', () => {
    component.wideElement = 'resume';

    component.toggleResumeWide();
    expect(component.wideElement).toEqual('');
  });

  it('expects "toggleResumeWide" to set wideElement to resume', () => {
    component.wideElement = '';

    component.toggleResumeWide();
    expect(component.wideElement).toEqual('resume');
  });

  it('expects "toggleJobWide" to set wideElement to an empty string', () => {
    component.wideElement = 'job';

    component.toggleJobWide();
    expect(component.wideElement).toEqual('');
  });

  it('expects "toggleJobWide" to set wideElement to resume', () => {
    component.wideElement = '';

    component.toggleJobWide();
    expect(component.wideElement).toEqual('job');
  });

    it('expects "onFileSelect" to do nothing if file is undefined', () => {
      let triggered = false;
      class MockFileReader {
        onload: any;
        readAsText() {
          triggered = true;
        }
      }
      component.fileReader = MockFileReader;
      const event: any = {
        target: {
          files: [undefined],
        },
      };
  
      component.onFileSelect(event);
      expect(triggered).toEqual(false);
    });
  
    it('expects "onFileSelect" to process file if file exists', () => {
      let triggered = false;
      class MockFileReader {
        onload: any;
        readAsText() {
          triggered = true;
        }
      }
      component.fileReader = MockFileReader;
      const event: any = {
        target: {
          files: [true],
        },
      };
  
      component.onFileSelect(event);
      expect(triggered).toEqual(true);
    });
  
    it('expects "readerOnload" to update to the passed structure', () => {
      const structure: Array<ResumeDetails> = [
        { name: 'IT EXISTS 1', content: '', keywords: [] },
        { name: 'IT EXISTS 2', content: '', keywords: [] },  
      ];
      const structureString: string = JSON.stringify(structure);
      const event: any = {
        target: {
          result: structureString,
        },
      };
      spyOn(component['service'], 'setResumes').and.stub();
  
      component.readerOnload(event);
      expect(component['service'].setResumes).toHaveBeenCalledWith(structure);
    });
  
});
