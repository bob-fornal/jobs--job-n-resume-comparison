import { ChangeDetectorRef, Component, effect, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import keyword_extractor from 'keyword-extractor';

import { ResumeDetails } from '../../core/interfaces/resume-details.interface';
import { CompareResumeService } from './compare-resume.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalIgnoreListComponent } from '../../shared/modal-ignore-list/modal-ignore-list.component';
import { JobKeywords } from '../../core/interfaces/job-keywords.interface';

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

  @ViewChild('jobPosting') jobPosting: any;

  private emptyJobKeywords = (): JobKeywords => ({
    match: [],
    noMatch: [],
  });
  jobKeywords: JobKeywords = {...this.emptyJobKeywords()};

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

  setTimeout = window.setTimeout;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private service: CompareResumeService,
  ) {
    this.init();

    effect(this.handleResumes.bind(this));
    effect(this.handleTriggerIgnoreListEffect.bind(this));
  }

  init = (): void => {
    this.service.getResumes();
    this.setTimeout(this.clearAll.bind(this), 100);
  };

  clearAll = (): void => {
    this.jobKeywords = {...this.emptyJobKeywords()};
    this.clearResumeDetails();
    this.clearJobDetails();
    this.validationChecks = {
      resumeNameLength: true,
      resumeNameInList: false,
      resumeContentLength: true,
      jobContentLength: true,
    };
  };

  handleResumes = (): void => {
    const resumes: Array<ResumeDetails> = this.service.resumes();
    this.resumes = resumes;
  };

  handleTriggerIgnoreListEffect = (): void => {
    const triggerIgnoreList: string = this.service.triggerIgnoreList();
    if (triggerIgnoreList === 'triggered') {
      this.service.clearTriggerIgnoreList();
      this.openIgnoreListModal();
    }
  };

  showMatchPercent = (resume: ResumeDetails): boolean => {
    return resume.hasOwnProperty('matchPercent') && resume.matchPercent !== null
  };

  getRange = (match: number): string => {
    switch (true) {
      case match >= 61 && match <= 80:
        return 'range-61-80';
      case match >= 81:
        return 'range-81-100';
      default:
        return 'range-0-60';
    }
  };

  openIgnoreListModal = (): void => {
    const listString: string = this.service.getIgnoreList().join(', ');
    const dialogRef = this.dialog.open(ModalIgnoreListComponent, { data: listString });
    dialogRef.afterClosed().subscribe(this.handleIgnoreListModalClose.bind(this));
  };

  handleIgnoreListModalClose = (listString: string | undefined): void => {
    if (listString === undefined) return;
    const list: Array<string> = listString.split(',').map((item: string) => item.trim()).sort();
    this.service.setDefaultIgnoreList(list);
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
    const resume: boolean = this.doesValidationDisable();
    const job: boolean = this.validationChecks['jobContentLength']
    return resume || job;
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

  getJobKeywords = (): Array<string> => {
    const jobPosting = this.jobPosting.nativeElement.value;
    
    const firstPassKeywords: Array<string> = this
      .keywordExtractor
      .extract(jobPosting, {
        language:"english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
      })
      .sort();

    const keywords: Array<string> = this.service.extractIgnoreList(firstPassKeywords);
    return keywords;
  };

  adjustResumeContent = (content: string): string => {
    const adjustedContent: string = content
      .split('\n')
      .filter((value: string) => !value.startsWith('##'))
      .join('\n');
    return adjustedContent;
  };

  getActiveResumeKeywords = (): Array<string> => {
    const resumeContent: string = this.resumeContent.nativeElement.value;
    const content: string = this.adjustResumeContent(resumeContent);

    const firstPassKeywords: Array<string> = this
      .keywordExtractor
      .extract(content, {
        language:"english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
      })
      .sort();

    const keywords: Array<string> = this.service.extractIgnoreList(firstPassKeywords);
    return keywords;
  };

  generateResumePercentages = (keywords: Array<string>): void => {
    this.resumes.forEach((resume: ResumeDetails) => {
      const matchedKeywords: Array<string> = resume.keywords.filter((word: string) => keywords.includes(word));
      const matchedKeywordsCount: number = matchedKeywords.length;
      const percent = Math.round((matchedKeywordsCount / keywords.length) * 100);
      resume.matchPercent = percent;
    });
  };

  runComparison = () => {
    const jobKeywords: Array<string> = this.getJobKeywords();
    this.generateResumePercentages(jobKeywords);

    const resumeKeywords: Array<string> = this.getActiveResumeKeywords();
    this.jobKeywords = {...this.emptyJobKeywords()};
    console.log(JSON.parse(JSON.stringify(this.emptyJobKeywords())));
    jobKeywords.forEach((keyword: string) => {
      if (resumeKeywords.includes(keyword)) {
        this.jobKeywords.match.push(keyword);
      } else {
        this.jobKeywords.noMatch.push(keyword);
      }
    });
  };

  checkIfResumeNameExists = (event: any): void => {
    const value = event.target.value;
    const names: Array<string> = this.resumes.map((resume: ResumeDetails) => (resume.name));
    const notInResumeNames: boolean = !!value && names.includes(value);
    this.validationChecks['resumeNameInList'] = notInResumeNames;
    this.changeDetectorRef.detectChanges();
  };
  
  deleteResume = (event: any, deleteResume: ResumeDetails): void => {
    event.stopPropagation();
    const resumes: Array<ResumeDetails> = [...this.resumes].filter((resume: ResumeDetails) => resume.name !== deleteResume.name);
    this.service.setResumes(resumes);
  };

  selectResume = (event: any, resume: ResumeDetails): void => {
    this.resumeForm.patchValue({
      resumeName: resume.name,
      resumeContent: resume.content,
    });
    this.textareaAdjust(this.resumeContent, true);
    
    this.resumeName.nativeElement.dispatchEvent(new Event('input'));
    this.resumeContent.nativeElement.dispatchEvent(new Event('input'));
    this.jobPosting.nativeElement.dispatchEvent(new Event('input'));
    this.changeDetectorRef.detectChanges();

    if (this.isRunComparisonDisabled() === false) {
      this.runComparison();
    }
  };

  clearResumeDetails = (): void => {
    this.selectResume({}, { name: '', content: '', keywords: [] });
    this.jobKeywords = {...this.emptyJobKeywords()};;
  };

  clearJobDetails = (): void => {
    this.jobPosting.nativeElement.value = '';
  };

  clearComparison = (): void => {
    this.jobKeywords = {...this.emptyJobKeywords()};;
    this.validationChecks = {
      resumeNameLength: true,
      resumeNameInList: false,
      resumeContentLength: true,
      jobContentLength: true,
    };
  };

  captureContent = (): { name: string, content: string } => {
    const name: string = this.resumeForm.value.resumeName || '';
    const content: string = this.resumeForm.value.resumeContent || '';
    return { name, content };
  };

  getKeywords = (content: string): Array<string> => {
    const adjustedContent: string = this.adjustResumeContent(content);

    const firstPassKeywords: Array<string> = this
      .keywordExtractor
      .extract(adjustedContent, {
        language:"english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
      })
      .sort();

    const keywords: Array<string> = this.service.extractIgnoreList(firstPassKeywords);
    return keywords;
  };

  onSubmit = (): void => {
    const { name, content } = this.captureContent();
    const keywords = this.getKeywords(content);
  
    const result: ResumeDetails = { name, content, keywords };
    const resumes: Array<ResumeDetails> = [...this.resumes];
    const index: number = resumes.findIndex((resume: ResumeDetails) => resume.name === result.name);
    if (index === -1) {
      resumes.push(result);
    } else {
      resumes[index] = { ...resumes[index], ...result };
    }

    this.service.setResumes(resumes);
    this.resumeForm.reset();

    this.clearComparison();
  };

  wideElement: string = '';

  toggleResumeWide = (): void => {
    if (this.wideElement === 'resume') {
      this.wideElement = '';
    } else {
      this.wideElement = 'resume';
    }
  };

  toggleJobWide = (): void => {
    if (this.wideElement === 'job') {
      this.wideElement = '';
    } else {
      this.wideElement = 'job';
    }
  };
}
