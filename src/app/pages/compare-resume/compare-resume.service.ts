import { effect, Injectable, signal } from '@angular/core';

import saveAs from 'file-saver';

import { ResumeDetails } from '../../core/interfaces/resume-details.interface';
import { MenuItem } from '../../core/interfaces/menu-item.interface';

import ignoreList from '../../core/constants/ignore-list.json';

import { TopToolbarService } from '../../shared/top-toolbar/top-toolbar.service';
import { StorageLayerService } from '../../core/services/storage-layer.service';

@Injectable({
  providedIn: 'root'
})
export class CompareResumeService {

  saveAs: any = saveAs;

  resumesSignal = signal<Array<ResumeDetails>>([]);
  readonly resumes = this.resumesSignal.asReadonly();

  defaultIgnoreList: Array<string> = ignoreList as Array<string>;

  menuItem: any;

  constructor(
    private storage: StorageLayerService,
    private toolbarService: TopToolbarService,
  ) {
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

  getResumes = async (): Promise<void> => {
    const resumes = await this.storage.getItem('resumes', 'job-squid--resumes');
    if (resumes === null) {
      await this.storage.setItem('resumes', 'job-squid--resumes', []);
      this.resumesSignal.set([]);
    } else {
      this.resumesSignal.set(resumes);
    }
  };

  setResumes = async (resumes: Array<ResumeDetails>): Promise<void> => {
    const sortedResumes: Array<ResumeDetails> = resumes
      .sort((a: ResumeDetails, b: ResumeDetails) => a.name.localeCompare(b.name))
      .map((resume: ResumeDetails) => {
        delete resume.matchPercent;
        return resume;
      });

    await this.storage.setItem('resumes', 'job-squid--resumes', sortedResumes);
    this.getResumes();
  };

  setDefaultIgnoreList = async (list: Array<string> | null = null): Promise<void> => {
    if (list === null) {
      const list: Array<string> | null = await this.storage.getItem('resumes', 'job-squid--ignore-list');
      if (list === null || list === undefined) {
        await this.storage.setItem('resumes', 'job-squid--ignore-list', this.defaultIgnoreList);
      }
    } else {
      await this.storage.setItem('resumes', 'job-squid--ignore-list', list);
    }
  };

  getIgnoreList = async (): Promise<Array<string>> => {
    const list: Array<string> = (await this.storage.getItem('resumes', 'job-squid--ignore-list') || []);
    return list;
  };

  extractIgnoreList = async (list: Array<string>): Promise<Array<string>> => {
    const ignoreList: Array<string> = await this.getIgnoreList();
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
