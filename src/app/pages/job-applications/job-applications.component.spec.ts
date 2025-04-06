import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicationsComponent } from './job-applications.component';

import { MockApplicationsTableComponent } from '../../shared/_specs/components/mock-applications-table.spec'
import { Tag } from '../../core/interfaces/tag';
import { JobApplication } from '../../core/interfaces/job-application';

describe('JobApplicationsComponent', () => {
  let component: JobApplicationsComponent;
  let fixture: ComponentFixture<JobApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        JobApplicationsComponent,

        MockApplicationsTableComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "init" to trigger the get tags functionality', () => {
    spyOn(component.taggingService, 'getTags').and.stub();

    component.init();
    expect(component.taggingService.getTags).toHaveBeenCalledWith('job-applications');
  });

  it('expects "handleTags" to get the tags and set them locally', () => {
    const tags: Array<Tag> = [
      {
        title: 'TITLE',
        backgroundColor: 'BACKGROUND-COLOR',
        foregroundColor: 'FOREGROUND-COLOR',
        original: true,
        showInModal: true,
      }
    ];
    spyOn(component.taggingService.signals, 'job-applications').and.returnValue(tags);

    component.handleTags();
    expect(component.tags).toEqual(tags);
  });

  it('expects "editTags" to return to the correct page', () => {
    spyOn(component.router, 'navigateByUrl').and.stub();

    component.editTags();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/tag-management/job-applications');
  });

  it('expects "getTagStyle" to return the correct styling', () => {
    const tag: Tag = {
      title: 'TITLE',
      backgroundColor: 'BACKGROUND-COLOR',
      foregroundColor: 'FOREGROUND-COLOR',
      original: true,
      showInModal: true,
    };
    const expected = '--mdc-chip-elevated-container-color: BACKGROUND-COLOR; --mdc-chip-label-text-color: FOREGROUND-COLOR; --mdc-chip-outline-color: FOREGROUND-COLOR; --mdc-chip-outline-width: 2px;';

    const result: string = component.getTagStyle(tag);
    expect(result).toEqual(expected);
  });

  it('expects "getTagStyle" to return the correct (reverse) styling', () => {
    const tag: Tag = {
      title: 'TITLE',
      backgroundColor: 'BACKGROUND-COLOR',
      foregroundColor: 'FOREGROUND-COLOR',
      original: true,
      showInModal: true,
    };
    const expected = '--mdc-chip-elevated-container-color: FOREGROUND-COLOR; --mdc-chip-label-text-color: BACKGROUND-COLOR; --mdc-chip-outline-color: BACKGROUND-COLOR; --mdc-chip-outline-width: 2px;';

    const result: string = component.getTagStyle(tag, true);
    expect(result).toEqual(expected);
  });

  it('expects "getCardColor" to get card classes (inactive & no tracking)', () => {
    const application: JobApplication = {
      title: 'TITLE',
      company: 'COMPANY',
      active: false,
      description: 'DESCRIPTION',
      requirements: 'REQUIREMENTS',
      links: [],
      tracking: [],
      connections: [],
    };
    const expected = 'base-card whole-card inactive no-tracking';

    const result: string = component.getCardColor(application);
    expect(result).toEqual(expected);
  });

  it('expects "getCardColor" to get card classes (active & tracking)', () => {
    const application: JobApplication = {
      title: 'TITLE',
      company: 'COMPANY',
      active: true,
      description: 'DESCRIPTION',
      requirements: 'REQUIREMENTS',
      links: [],
      tracking: [{
        datetimestamp: 'DATETIMESTAMP',
        description: 'DESCRIPTION'
      }],
      connections: [],
    };
    const expected = 'base-card whole-card active';

    const result: string = component.getCardColor(application);
    expect(result).toEqual(expected);
  });

  it('expects "getTitleCompany" to get the correct result', () => {
    const application: JobApplication = {
      title: 'TITLE',
      company: 'COMPANY',
      active: true,
      description: 'DESCRIPTION',
      requirements: 'REQUIREMENTS',
      links: [],
      tracking: [],
      connections: [],
    };
    const expected = 'COMPANY (TITLE)';

    const result: string = component.getTitleCompany(application);
    expect(result).toEqual(expected);
  });

  it('expects "add" to navigate to the correct page', () => {
    spyOn(component.router, 'navigateByUrl').and.stub();

    component.add();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/job-applications/add');
  });
});
