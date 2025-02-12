import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StorageClassAbstraction } from '../../core/services/storage-class-abstraction.abstract';

import { ResumeDetails } from '../../core/interfaces/resume-details.interface';

import ignoreList from '../../core/constants/ignore-list.json';

@Injectable({
  providedIn: 'root'
})
export class CompareResumeService extends StorageClassAbstraction {

  resumes: BehaviorSubject<Array<ResumeDetails>> = new BehaviorSubject<Array<ResumeDetails>>([]);

  defaultIgnoreList: Array<string> = ignoreList as Array<string>;

  constructor() {
    super();

    this.setDefaultIgnoreList();
  }

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

  setDefaultIgnoreList = (list: Array<string> | null = null): void => {
    if (list === null) {
      this.localstorage.setItem('job-squid--ignore-list', JSON.stringify(this.defaultIgnoreList));
    } else {
      this.localstorage.setItem('job-squid--ignore-list', JSON.stringify(list));
    }
  };

  getIgnoreList = (): Array<string> => {
    const listString: string = this.localstorage.getItem('job-squid--ignore-list');
    const list: Array<string> = JSON.parse(listString);
    return list;
  };

  extractIgnoreList = (list: Array<string>): Array<string> => {
    const ignoreList: Array<string> = this.getIgnoreList();
    return list.filter((item: string) => !ignoreList.includes(item));
  };
}
