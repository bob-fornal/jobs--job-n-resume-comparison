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
});
