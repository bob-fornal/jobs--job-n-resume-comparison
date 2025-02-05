import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import keyword_extractor from 'keyword-extractor';

import { StorageService } from '../../core/services/storage.service';
import { ResumeDetails } from '../../core/interfaces/resume-details.interface';

@Component({
  selector: 'app-compare-resume',
  standalone: false,
  
  templateUrl: './compare-resume.component.html',
  styleUrl: './compare-resume.component.css'
})
export class CompareResumeComponent {
  keywordExtractor: any = keyword_extractor;
  resumes: Array<ResumeDetails> = [];

  @ViewChild('resumeName') resumeName: any;
  @ViewChild('resumeContent') resumeContent: any;

  validationChecks: { [key: string]: boolean } = {
    resumeNameLength: true,
    resumeNameInList: false,
    resumeContentLength: true,
    jobContentLength: true,
  };

  resumeForm = new FormGroup({
    resumeName: new FormControl('', [Validators.minLength(3)]),
    resumeContent: new FormControl('', [ Validators.minLength(5)]),
  });

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private storage: StorageService,
  ) {
    this.storage.resumes.subscribe(this.handleResumes.bind(this));
    this.init();
  }

  init = (): void => {
    this.storage.getResumes();
  };

  textareaAdjust = (event: any, isTarget: boolean = false): void => {
    const target: any = isTarget ? event.nativeElement : event.target;
    target.style.height = '1px';
    target.style.height = 16 + target.scrollHeight + 'px';
  };

  doesValidationDisable = (): boolean => {
    return this.validationChecks['resumeNameLength'] || this.validationChecks['resumeContentLength']
  };

  isRunComparisonDisabled = (): boolean => {
    return this.doesValidationDisable() || this.validationChecks['jobContentLength'];
  };

  changeValidationState = (key: string, event: any, check: number): void => {
    const lengthError: boolean = event.target.value.length <= check;
    this.validationChecks[key] = lengthError;
  };

  triggerResumeNameValidation = (event: any): void => {
    this.changeValidationState('resumeNameLength', event, 3);
    this.checkIfResumeNameExists(event);
  };

  triggerResumeContentValidation = (event: any): void => {
    this.changeValidationState('resumeContentLength', event, 5);
  };

  triggerJobValidation = (event: any): void => {
    const lengthError: boolean = event.target.value.length <= 1;
    this.validationChecks['jobContentLength'] = lengthError;
  };

  checkIfResumeNameExists = (event: any): void => {
    const value = event.target.value;
    const names: Array<string> = this.resumes.map((resume: ResumeDetails) => (resume.name));
    const notInResumeNames: boolean = !!value && names.includes(value);
    this.validationChecks['resumeNameInList'] = notInResumeNames;
    this.changeDetectorRef.detectChanges();
  };
  
  handleResumes = (data: Array<ResumeDetails>): void => {
    this.resumes = data;
  };

  deleteResume = (deleteResume: ResumeDetails): void => {
    const resumes: Array<ResumeDetails> = [...this.resumes].filter((resume: ResumeDetails) => resume.name !== deleteResume.name);
    this.storage.setResumes(resumes);
  };

  selectResume = (event: any, resume: ResumeDetails): void => {
    if (event.target.classList.includes('delete-icon')) return;

    this.resumeForm.patchValue({
      resumeName: resume.name,
      resumeContent: resume.content,
    });
    this.textareaAdjust(this.resumeContent, true);
    
    this.resumeName.nativeElement.dispatchEvent(new Event('input'));
    this.resumeContent.nativeElement.dispatchEvent(new Event('input'));
    this.changeDetectorRef.detectChanges();
  };

  clearResumeDetails = (): void => {
    this.selectResume({}, { name: '', content: '', keywords: [] });
  };

  onSubmit = (): void => {
    const name: string = this.resumeForm.value.resumeName || '';
    const content: string = this.resumeForm.value.resumeContent || '';

    const adjustedContent: string = content
      .split('\n')
      .filter((value: string) => !value.startsWith('##'))
      .join('\n');

    const keywords = this.keywordExtractor
      .extract(adjustedContent, {
        language:"english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
      })
      .sort();
    
      const result: ResumeDetails = { name, content, keywords };
      const resumes: Array<ResumeDetails> = [...this.resumes];
      const index: number = resumes.findIndex((resume: ResumeDetails) => resume.name === result.name);
      if (index === -1) {
        resumes.push(result);
      } else {
        resumes[index] = result;
      }
      this.storage.setResumes(resumes);

      this.resumeForm.reset();
  };
}
