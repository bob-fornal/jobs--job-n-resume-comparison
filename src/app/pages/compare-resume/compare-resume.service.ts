import { effect, Injectable, signal } from '@angular/core';

import saveAs from 'file-saver';

import { StorageClassAbstraction } from '../../core/services/storage-class-abstraction.abstract';

import { ResumeDetails } from '../../core/interfaces/resume-details.interface';
import { MenuItem } from '../../core/interfaces/menu-item.interface';

import ignoreList from '../../core/constants/ignore-list.json';

import { TopToolbarService } from '../../shared/top-toolbar/top-toolbar.service';

@Injectable({
  providedIn: 'root'
})
export class CompareResumeService extends StorageClassAbstraction {

  saveAs: any = saveAs;

  resumesSignal = signal<Array<ResumeDetails>>([]);
  readonly resumes = this.resumesSignal.asReadonly();

  defaultIgnoreList: Array<string> = ignoreList as Array<string>;

  menuItem: any;

  constructor(
    private toolbarService: TopToolbarService,
  ) {
    super();

    this.setDefaultIgnoreList();

    this.menuItem = this.toolbarService.menuItem;
    effect(this.handleMenuItemEffect.bind(this));
  }

  handleMenuItemEffect = (): void => {
    const { page, item }: MenuItem = this.menuItem();
    if (page === 'resumes') {
      switch (item) {
        case 'change-ignore-list':
          this.changeIgnoreList();
          break;
        case 'export-current-recordset':
          this.exportCurrentRecordset();
          break;
        case 'import-saved-recordset':
          this.importSavedRecordset();
          break;
        }
    }
  };

  getResumes = (): void => {
    const resumes = this.localstorage.getItem('job-squid--resumes');
    if (resumes === null) {
      this.localstorage.setItem('job-squid--resumes', '[]');
      this.resumesSignal.set([]);
    } else {
      const items: Array<ResumeDetails> = JSON.parse(resumes);
      this.resumesSignal.set(items);
    }
  };

  setResumes = (resumes: Array<ResumeDetails>): void => {
    const sortedResumes: Array<ResumeDetails> = resumes
      .sort((a: ResumeDetails, b: ResumeDetails) => a.name.localeCompare(b.name))
      .map((resume: ResumeDetails) => {
        delete resume.matchPercent;
        return resume;
      });

    const resumesString: string = JSON.stringify(sortedResumes);
    this.localstorage.setItem('job-squid--resumes', resumesString);
    this.getResumes();
  };

  setDefaultIgnoreList = (list: Array<string> | null = null): void => {
    if (list === null) {
      const listString = this.localstorage.getItem('job-squid--ignore-list');
      if (listString === null) {
        this.localstorage.setItem('job-squid--ignore-list', JSON.stringify(this.defaultIgnoreList));
      }
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

  triggerIgnoreListSignal = signal('not-triggered');
  readonly triggerIgnoreList = this.triggerIgnoreListSignal.asReadonly();

  changeIgnoreList = (): void => {
    this.triggerIgnoreListSignal.set('triggered');
  };

  clearTriggerIgnoreList = (): void => {
    this.triggerIgnoreListSignal.set('not-triggered');
  };

  exportCurrentRecordset = (): void => {
    const resumes = this.resumes().map(({ matchPercent, ...rest }: ResumeDetails) => rest);
    const currentRecorset: string = JSON.stringify(resumes);
    const blob = new Blob([currentRecorset], { type: 'text/plain;charset=utf-8'});
    this.saveAs(blob, 'current-resumes.json');
  };

  triggerImportSignal = signal('inactive');
  readonly triggerImport = this.triggerImportSignal.asReadonly();

  importSavedRecordset = (): void => {
    this.triggerImportSignal.set('active');
  };

  clearTriggerImport = (): void => {
    this.triggerImportSignal.set('inactive');
  };
}
