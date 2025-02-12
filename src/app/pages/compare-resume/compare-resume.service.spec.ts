import { TestBed } from '@angular/core/testing';

import { CompareResumeService } from './compare-resume.service';
import { ResumeDetails } from '../../core/interfaces/resume-details.interface';

describe('CompareResumeService', () => {
  let service: CompareResumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareResumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
});
