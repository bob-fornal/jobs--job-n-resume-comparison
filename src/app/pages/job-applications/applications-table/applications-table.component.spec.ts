import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { ApplicationsTableComponent } from './applications-table.component';

import { FilterSettings } from '../../../core/interfaces/filter-state.interface';
import { JobApplication } from '../../../core/interfaces/job-application';

describe('ApplicationsTableComponent', () => {
  let component: ApplicationsTableComponent;
  let fixture: ComponentFixture<ApplicationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
      ],
      declarations: [
        ApplicationsTableComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "init" to trigger service init', async () => {
    spyOn(component.service, 'init').and.stub();

    await component.init();
    expect(component.service.init).toHaveBeenCalled();
  });

  it('expects "handleApplicationsChange" to get list of applications', () => {
    spyOn(component.service, 'applications').and.returnValue([]);
    spyOn(component.changeRef, 'detectChanges').and.stub();

    component.handleApplicationsChange();
    expect(component.service.applications).toHaveBeenCalled();
    expect(component.changeRef.detectChanges).toHaveBeenCalled();
  });

  it('expects "handleFilterSettings" to get the filter settings', () => {
    const settings: FilterSettings = {
      showActiveApplicationsOnly: true,
      showMostRecent: true,
    };
    spyOn(component.service, 'filterState').and.returnValue(settings);
    
    component.handleFilterSettings();
    expect(component.filterSettings).toEqual(settings);
  });

  it('expects "getDate" to return empty string if no tracking data', () => {
    const application: JobApplication = {
      title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [],
    };

    const result: string = component.getDate(application);
    expect(result).toEqual('');
  });

  it('expects "getDate" to return newest record if show most recent set to true', () => {
    const application: JobApplication = {
      title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [{
        datetimestamp: '2025-01-01', description: '',
      }, {
        datetimestamp: '2024-12-12', description: '',
      }, {
        datetimestamp: '2025-02-02', description: '',
      }, {
        datetimestamp: '2025-04-04', description: '',
      }, {
        datetimestamp: '2025-03-03', description: '',
      }],
    };
    component.date.showMostRecent = true;

    const result: string = component.getDate(application);
    expect(result).toEqual('2025-04-04');
  });

  it('expects "getDate" to return oldest record if show most recent set to false', () => {
    const application: JobApplication = {
      title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [{
        datetimestamp: '2025-01-01', description: '',
      }, {
        datetimestamp: '2024-12-12', description: '',
      }, {
        datetimestamp: '2025-02-02', description: '',
      }, {
        datetimestamp: '2025-04-04', description: '',
      }, {
        datetimestamp: '2025-03-03', description: '',
      }],
    };

    component.date.showMostRecent = false;

    const result: string = component.getDate(application);
    expect(result).toEqual('2024-12-12');
  });

  it('expects "getDateTitle" to return newest based on state', () => {
    spyOn(component.service, 'filterState').and.returnValue({
      showActiveApplicationsOnly: false,
      showMostRecent: true,
    });

    const result: string = component.getDateTitle();
    expect(result).toEqual('newest');
  });

  it('expects "getDateTitle" to return oldest based on state', () => {
    spyOn(component.service, 'filterState').and.returnValue({
      showActiveApplicationsOnly: false,
      showMostRecent: false,
    });

    const result: string = component.getDateTitle();
    expect(result).toEqual('oldest');
  });

  it('expects "getLastTrackingTagStyle" to return creation style', () => {
    const application: JobApplication = {
      title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [],
    };
    const expected = '--mat-table-row-item-label-text-color: #000011; --mat-icon-color: #000011; background-color: #f0efef;';

    const result: string = component.getLastTrackingTagStyle(application);
    expect(result).toEqual(expected);
  });

  it('expects "getLastTrackingTagStyle" to return most recent style', () => {
    const application: JobApplication = {
      title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [{
        datetimestamp: '2025-01-01', description: '', tag: {
          title: 'jan', backgroundColor: '#123456', foregroundColor: '#654321', original: false, showInModal: true
        },
      }, {
        datetimestamp: '2024-12-12', description: '', tag: {
          title: 'Creation', backgroundColor: '#123456', foregroundColor: '#654321', original: false, showInModal: true
        },
      }, {
        datetimestamp: '2025-02-02', description: '', tag: {
          title: 'feb', backgroundColor: '#123456', foregroundColor: '#654321', original: false, showInModal: true
        },
      }, {
        datetimestamp: '2025-04-04', description: '', tag: {
          title: 'apr', backgroundColor: '#444444', foregroundColor: '#333333', original: false, showInModal: true
        },
      }, {
        datetimestamp: '2025-03-03', description: '', tag: {
          title: 'mar', backgroundColor: '#123456', foregroundColor: '#654321', original: false, showInModal: true
        },
      }],
    };
    const expected = '--mat-table-row-item-label-text-color: #333333; --mat-icon-color: #333333; background-color: #444444;';

    const result: string = component.getLastTrackingTagStyle(application);
    expect(result).toEqual(expected);
  });

  it('expects "edit" to navifate to the edit page', () => {
    const application: JobApplication = {
      index: 3, title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [],
    };
    spyOn(component.router, 'navigateByUrl').and.stub();

    component.edit(application);
    expect(component.router.navigateByUrl).toHaveBeenCalledOnceWith('/job-applications/edit/3');
  });

  it('expects "editTracking" to navifate to the edit page', () => {
    const application: JobApplication = {
      index: 3, title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [],
    };
    spyOn(component.router, 'navigateByUrl').and.stub();

    component.editTracking(application);
    expect(component.router.navigateByUrl).toHaveBeenCalledOnceWith('/job-applications/view-tracking/3');
  });

  it('expects "delete" to trigger service delete', () => {
    const application: JobApplication = {
      index: 3, title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [],
    };
    spyOn(component.service, 'deleteApplication').and.stub();

    component.delete(application);
    expect(component.service.deleteApplication).toHaveBeenCalledOnceWith(application);
  });
});
