import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ResumeDetails } from '../../core/interfaces/resume-details.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localstorage: any = window.localStorage;

  resumes: BehaviorSubject<Array<ResumeDetails>> = new BehaviorSubject<Array<ResumeDetails>>([]);

  getResumes = (): void => {
    const resumes = this.localstorage.getItem('job-squid--resumes');
    if (resumes === null) {
      this.localstorage.setItem('job-squid--resumes', '[]');
      this.resumes.next([]);
    } else {
      const item: Array<ResumeDetails> = JSON.parse(resumes);
      this.resumes.next(item);
    }
  };

  setResumes = (resumes: Array<ResumeDetails>): void => {
    const resumesString: string = JSON.stringify(resumes);
    this.localstorage.setItem('job-squid--resumes', resumesString);
  };
}
