import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import keyword_extractor from 'keyword-extractor';

import { StorageService } from '../../core/services/storage.service';
import { ResumeDetails } from '../../core/interfaces/resume-details.interface';

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Component({
  selector: 'app-compare-resume',
  standalone: false,
  
  templateUrl: './compare-resume.component.html',
  styleUrl: './compare-resume.component.css'
})
export class CompareResumeComponent {
  resumes: Array<ResumeDetails> = [];

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

  doesValidationDisable = (): boolean => {
    return this.validationChecks['resumeNameLength'] || this.validationChecks['resumeContentLength']
  };

  isRunComparisonDisabled = (): boolean => {
    return this.doesValidationDisable() || this.validationChecks['jobContentLength'];
  };

  changeValidationState = (key: string, control: string, event: any, check: number): void => {
    const lengthError: boolean = event.target.value.length <= check;
    this.validationChecks[key] = lengthError;
  };

  triggerResumeNameValidation = (event: any): void => {
    this.changeValidationState('resumeNameLength', 'resumeName', event, 3);
    this.checkIfResumeNameExists(event);
  };

  triggerResumeContentValidation = (event: any): void => {
    this.changeValidationState('resumeContentLength', 'resumeContent', event, 5);
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

  selectResume = (resume: ResumeDetails): void => {};

  onSubmit = (): void => {};
}
