import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { ResumeDetails } from '../interfaces/resume-details.interface';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "getDarkMode to return false if nothing in local storage', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue(null);
    spyOn(service.localstorage, 'setItem').and.stub();

    const result: boolean = service.getDarkMode();
    expect(result).toEqual(false);
    expect(service.localstorage.setItem).toHaveBeenCalledWith('job-squid--dark-mode', 'false');
  });

  it('expects "getDarkMode" to return true of mode is true', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue('true');

    const result: boolean = service.getDarkMode();
    expect(result).toEqual(true);
  });

  it('expects "getDarkMode" to return false of mode is false', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue('false');

    const result: boolean = service.getDarkMode();
    expect(result).toEqual(false);
  });

  it('expects "setDarkMode" to change the storage item', () => {
    spyOn(service.localstorage, 'setItem').and.stub();
    const mode: boolean = true;

    service.setDarkMode(mode);
    expect(service.localstorage.setItem).toHaveBeenCalledWith('job-squid--dark-mode', 'true');
  });

  it('expects "getResumes" to return an empty array of nothing stored', () => {
    spyOn(service.localstorage, 'getItem').and.returnValue(null);
    spyOn(service.localstorage, 'setItem').and.stub();
    spyOn(service.resumes, 'next').and.stub();

    service.getResumes();
    expect(service.localstorage.setItem).toHaveBeenCalledWith('job-squid--resumes', '[]');
    expect(service.resumes.next).toHaveBeenCalledWith([]);
  });

  it('expects "getResumes" to return an array of resumes', () => {
    const resumes: Array<ResumeDetails> = [
      { name: 'TEST', content: 'TEST', keywords: [] }
    ];
    const resumesString: string = JSON.stringify(resumes);
    spyOn(service.localstorage, 'getItem').and.returnValue(resumesString);
    spyOn(service.resumes, 'next').and.stub();

    service.getResumes();
    expect(service.resumes.next).toHaveBeenCalledWith(resumes);
  });
});
