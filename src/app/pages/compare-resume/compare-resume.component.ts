import { Component } from '@angular/core';
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
  resumes: Array<ResumeDetails> = [];

  constructor(
    private storage: StorageService
  ) {
    this.storage.resumes.subscribe(this.handleResumes.bind(this));
    this.init();
  }

  init = (): void => {
    this.storage.getResumes();
  };

  handleResumes = (data: Array<ResumeDetails>): void => {
    this.resumes = data;
  };

  selectResume = (resume: ResumeDetails): void => {};
}
