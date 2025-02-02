import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ResumeDetails } from '../../core/interfaces/resume-details.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localstorage: any = window.localStorage;

  resumes: BehaviorSubject<Array<ResumeDetails>> = new BehaviorSubject<Array<ResumeDetails>>([]);

  getDarkMode = (): boolean => {
    const mode = this.localstorage.getItem('job-squid--dark-mode');
    if (mode === null) {
      this.localstorage.setItem('job-squid--dark-mode', 'false');
      return false;
    } else {
      return mode === 'true';
    }
  };

  setDarkMode = (mode: boolean): void => {
    const modeString: string = JSON.stringify(mode);
    this.localstorage.setItem('job-squid--dark-mode', modeString);
  };

  getResumes = (): void => {
    const resumes = this.localstorage.getItem('job-squid--resumes');
    if (resumes === null) {
      this.localstorage.setItem('job-squid--resumes', '[]');
      this.resumes.next([]);
    } else {
      const items: Array<ResumeDetails> = JSON.parse(resumes);
      this.resumes.next(items);
    }
  };

  setResumes = (resumes: Array<ResumeDetails>): void => {
    const sortedResumes: Array<ResumeDetails> = resumes.sort((a: ResumeDetails, b: ResumeDetails) => a.name.localeCompare(b.name));

    const resumesString: string = JSON.stringify(sortedResumes);
    this.localstorage.setItem('job-squid--resumes', resumesString);
    this.getResumes();
  };
}
