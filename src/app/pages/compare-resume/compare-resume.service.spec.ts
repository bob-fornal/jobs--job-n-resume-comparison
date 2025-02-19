import { TestBed } from '@angular/core/testing';

import { CompareResumeService } from './compare-resume.service';

import { ResumeDetails } from '../../core/interfaces/resume-details.interface';
import { MenuItem } from '../../core/interfaces/menu-item.interface';

import ignoreList from '../../core/constants/ignore-list.json';

describe('CompareResumeService', () => {
  let service: CompareResumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareResumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "handleMenuItemEffect" to do nothing if page is not resumes', () => {
    const menuItem: MenuItem = { page: 'not-resumes', item: '' };
    spyOn(service, 'menuItem').and.returnValue(menuItem);
    spyOn(service, 'changeIgnoreList').and.stub();

    service.handleMenuItemEffect();
    expect(service.changeIgnoreList).not.toHaveBeenCalled();
  });

  it('expects "handleMenuItemEffect" to trigger change ignore list if item is change-ignore-list', () => {
    const menuItem: MenuItem = { page: 'resumes', item: 'change-ignore-list' };
    spyOn(service, 'menuItem').and.returnValue(menuItem);
    spyOn(service, 'changeIgnoreList').and.stub();

    service.handleMenuItemEffect();
    expect(service.changeIgnoreList).toHaveBeenCalled();
  });

  it('expects "handleMenuItemEffect" to trigger export current records if item is export-current-recordset', () => {
    const menuItem: MenuItem = { page: 'resumes', item: 'export-current-recordset' };
    spyOn(service, 'menuItem').and.returnValue(menuItem);
    spyOn(service, 'exportCurrentRecordset').and.stub();

    service.handleMenuItemEffect();
    expect(service.exportCurrentRecordset).toHaveBeenCalled();
  });

  it('expects "handleMenuItemEffect" to trigger import saved records if item is import-saved-recordset', () => {
    const menuItem: MenuItem = { page: 'resumes', item: 'import-saved-recordset' };
    spyOn(service, 'menuItem').and.returnValue(menuItem);
    spyOn(service, 'importSavedRecordset').and.stub();

    service.handleMenuItemEffect();
    expect(service.importSavedRecordset).toHaveBeenCalled();
  });

  it('expects "getResumes" to return an empty array of nothing stored', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue(null);
    spyOn(service.localstorage, 'setItem').and.stub();
    spyOn(service.resumesSignal, 'set').and.stub();

    service.getResumes();
    expect(service.localstorage.setItem).toHaveBeenCalledWith('job-squid--resumes', '[]');
    expect(service.resumesSignal.set).toHaveBeenCalledWith([]);
  });

  it('expects "getResumes" to return an array of resumes', () => {
    const resumes: Array<ResumeDetails> = [
      { name: 'TEST', content: 'TEST', keywords: [] }
    ];
    const resumesString: string = JSON.stringify(resumes);
    spyOn(service.localstorage, 'getItem').and.returnValue(resumesString);
    spyOn(service.resumesSignal, 'set').and.stub();

    service.getResumes();
    expect(service.resumesSignal.set).toHaveBeenCalledWith(resumes);
  });

  it('expects "setResumes" to sort and store the resumes', () => {
    const resumesUnsorted: Array<ResumeDetails> = [
      { name: 'TEST-C', content: 'TEST', keywords: [] },
      { name: 'TEST-B', content: 'TEST', keywords: [] },
      { name: 'TEST-A', content: 'TEST', keywords: [] },
    ];
    const resumesSorted: Array<ResumeDetails> = [
      { name: 'TEST-A', content: 'TEST', keywords: [] },
      { name: 'TEST-B', content: 'TEST', keywords: [] },
      { name: 'TEST-C', content: 'TEST', keywords: [] },
    ];
    const resumesString: string = JSON.stringify(resumesSorted);
    spyOn(service.localstorage, 'setItem').and.stub();
    spyOn(service, 'getResumes').and.stub();

    service.setResumes(resumesUnsorted);
    expect(service.localstorage.setItem).toHaveBeenCalledWith('job-squid--resumes', resumesString);
    expect(service.getResumes).toHaveBeenCalled();
  });

  it('expects "setDefaultIgnoreList" to get null and write default to storage', () => {
    const list: Array<string> | null = null;
    const ignoreListString: string = JSON.stringify(ignoreList);
    spyOn(service.localstorage, 'getItem').and.returnValue(null);
    spyOn(service.localstorage, 'setItem').and.stub();

    service.setDefaultIgnoreList(list);
    expect(service.localstorage.setItem).toHaveBeenCalledWith('job-squid--ignore-list', ignoreListString);
  });

  it('expects "setDefaultIgnoreList" to get null and do nothing if there is content in storage', () => {
    const list: Array<string> | null = null;
    const ignoreListString: string = JSON.stringify(ignoreList);
    spyOn(service.localstorage, 'getItem').and.returnValue('CONTENT');
    spyOn(service.localstorage, 'setItem').and.stub();

    service.setDefaultIgnoreList(list);
    expect(service.localstorage.setItem).not.toHaveBeenCalledWith('job-squid--ignore-list', ignoreListString);
  });

  it('expects "setDefaultIgnoreList" to write the new content passed in', () => {
    const list: Array<string> | null = ['test1', 'test2'];
    const ignoreListString: string = JSON.stringify(list);
    spyOn(service.localstorage, 'setItem').and.stub();

    service.setDefaultIgnoreList(list);
    expect(service.localstorage.setItem).toHaveBeenCalledWith('job-squid--ignore-list', ignoreListString);
  });

  it('expects "getIgnoreList" to return content of storage', () => {
    const list: Array<string> | null = ['test1', 'test2'];
    const ignoreListString: string = JSON.stringify(list);
    spyOn(service.localstorage, 'getItem').and.returnValue(ignoreListString);
    
    const response: Array<string> = service.getIgnoreList();
    expect(response).toEqual(list);
  });

  it('expects "extractIgnoreList" to get the list and remove them from passed in list', () => {
    const list: Array<string> = ['1', '2', '3', '4', '5'];
    const ignoreList: Array<string> = ['3', '5'];
    const expectedList: Array<string> = ['1', '2', '4'];
    spyOn(service, 'getIgnoreList').and.returnValue(ignoreList);

    const result: Array<string> = service.extractIgnoreList(list);
    expect(result).toEqual(expectedList);
  });

  it('expects "changeIgnoreList" to change signal to triggered', () => {
    spyOn(service.triggerIgnoreListSignal, 'set').and.stub();

    service.changeIgnoreList();
    expect(service.triggerIgnoreListSignal.set).toHaveBeenCalledWith('triggered');
  });

  it('expects "clearTriggerIgnoreList" to change signal to not-triggered', () => {
    spyOn(service.triggerIgnoreListSignal, 'set').and.stub();

    service.clearTriggerIgnoreList();
    expect(service.triggerIgnoreListSignal.set).toHaveBeenCalledWith('not-triggered');
  });

  it('expects "exportCurrentRecordset" to export without matchPercent values', () => {
    const resumes: Array<ResumeDetails> = [
      { name: 'RESUME1', content: 'CONTENT1', keywords: [], matchPercent: 10 },
      { name: 'RESUME2', content: 'CONTENT2', keywords: [], matchPercent: 20 },
      { name: 'RESUME3', content: 'CONTENT3', keywords: [], matchPercent: 30 },
    ];
    const written: Array<ResumeDetails> = [
      { name: 'RESUME1', content: 'CONTENT1', keywords: [] },
      { name: 'RESUME2', content: 'CONTENT2', keywords: [] },
      { name: 'RESUME3', content: 'CONTENT3', keywords: [] },
    ];
    const writtenString: string = JSON.stringify(written);
    const expected = new Blob([writtenString], { type: 'text/plain;charset=utf-8' });
    spyOn(service, 'resumes').and.returnValue(resumes);
    spyOn(service, 'saveAs').and.stub();

    service.exportCurrentRecordset();
    expect(service.saveAs).toHaveBeenCalledWith(expected, 'current-resumes.json');
  });

  it('expects "importSavedRecordset" to set signal to active', () => {
    spyOn(service.triggerImportSignal, 'set').and.stub();

    service.importSavedRecordset();
    expect(service.triggerImportSignal.set).toHaveBeenCalledWith('active');
  });

  it('expects "clearTriggerImport" to set signal to inactive', () => {
    spyOn(service.triggerImportSignal, 'set').and.stub();

    service.clearTriggerImport();
    expect(service.triggerImportSignal.set).toHaveBeenCalledWith('inactive');
  });
});
