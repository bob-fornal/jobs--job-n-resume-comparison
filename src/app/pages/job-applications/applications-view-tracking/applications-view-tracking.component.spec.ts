import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApplicationsViewTrackingComponent } from './applications-view-tracking.component';

const mockActivatedRoute: any = {
  paramMap: of({ get: (key: string) => 'mockValue' }),
  queryParamMap: of({ get: (key: string) => 'mockQueryValue' }),
  snapshot: {
    params: {},
    paramMap: { get: (key: string) => 'mockSnapshotValue' },
    queryParamMap: { get: (key: string) => 'mockSnapshotQueryValue' },
  },
  data: of({ key: 'mockData' })
};

import { MatIconModule } from '@angular/material/icon';
import { JobActivity, JobApplication } from '../../../core/interfaces/job-application';
import { Tag } from '../../../core/interfaces/tag';

describe('ApplicationsViewTrackingComponent', () => {
  let component: ApplicationsViewTrackingComponent;
  let fixture: ComponentFixture<ApplicationsViewTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
      ],
      declarations: [
        ApplicationsViewTrackingComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsViewTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "init" to trigger the process to get the application data', async () => {
    const application: JobApplication = {
      title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [],
    };
    component.activatedRoute.snapshot.params['index'] = '1';
    spyOn(component.service, 'init').and.resolveTo();
    spyOn(component.service, 'getApplicationByIndex').and.returnValue(application);

    await component.init();
    expect(component.service.init).toHaveBeenCalled();
    expect(component.application).toEqual(application);
  });

  it('expects "back" to return to job applications', () => {
    spyOn(component.router, 'navigateByUrl').and.stub();

    component.back();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/job-applications');
  });

  it('expects "getCompanyTitle" to return the company title combination', () => {
    component.application = {
      title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [],
    };

    const result: string = component.getCompanyTitle();
    expect(result).toEqual('COMPANY (TITLE)');
  });

  it('expects "addTrackingItem" to open a dialog', () => {
    const emptyTag: Tag = {
        title: '',
        backgroundColor: '',
        foregroundColor: '',
        original: false,
        showInModal: false,
      };
    component.application = {
      index: 3, title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [],
    };
    spyOn(component.dialog, 'open').and.stub();
    const expected = { data: {
      index: 3,
      title: 'Add',
      datetimestamp: '',
      description: '',
      tag: emptyTag,
      tagIndex: -1,
      connection: {},
    } };

    component.addTrackingItem();
    expect(component.dialog.open).toHaveBeenCalledWith(jasmine.any(Function), expected);
  });

  it('expects "editTrackingItem" to open a dialog', () => {
    const trackingItem : JobActivity = {
      datetimestamp: 'DATETIMESTAMP',
      description: '',
      tag: {
        title: 'TAG-TITLE',
        backgroundColor: 'TAG-BACKGROUND-COLOR',
        foregroundColor: 'TAG-FOREGROUND-COLOR',
        original: false,
        showInModal: false,
      },
      connection: {},
    };
    component.application = {
      index: 3, title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [trackingItem],
    };
    spyOn(component.dialog, 'open').and.stub();
    const expected = { data: {
      index: 3,
      title: 'Edit',
      datetimestamp: 'DATETIMESTAMP',
      description: '',
      tag: trackingItem.tag,
      tagIndex: 0,
      connection: {},
    } };

    component.editTrackingItem(0);
    expect(component.dialog.open).toHaveBeenCalledWith(jasmine.any(Function), expected);
  });

  it('expects "deleteTrackingItem" to save an updated application', () => {
    const trackingItem1: JobActivity = {
      datetimestamp: 'DATETIMESTAMP',
      description: '1',
      tag: {
        title: 'TAG-TITLE', backgroundColor: 'TAG-BACKGROUND-COLOR', foregroundColor: 'TAG-FOREGROUND-COLOR', original: false, showInModal: false,
      },
      connection: {},
    };
    const trackingItem2: JobActivity = {
      datetimestamp: 'DATETIMESTAMP',
      description: '1',
      tag: {
        title: 'TAG-TITLE', backgroundColor: 'TAG-BACKGROUND-COLOR', foregroundColor: 'TAG-FOREGROUND-COLOR', original: false, showInModal: false,
      },
      connection: {},
    };
    const trackingItem3: JobActivity = {
      datetimestamp: 'DATETIMESTAMP',
      description: '1',
      tag: {
        title: 'TAG-TITLE', backgroundColor: 'TAG-BACKGROUND-COLOR', foregroundColor: 'TAG-FOREGROUND-COLOR', original: false, showInModal: false,
      },
      connection: {},
    };
    component.application = {
      index: 3, title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [trackingItem1, trackingItem2, trackingItem3],
    };
    const expected: JobApplication = {
      index: 3, title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [trackingItem1, trackingItem3],
    };
    spyOn(component.service, 'saveApplication').and.stub();

    component.deleteTrackingItem(1);
    expect(component.service.saveApplication).toHaveBeenCalledWith(expected);
  });

  it('expects "isIndexOdd to return false for 0', () => {
    const index = 0;

    const result: boolean = component.isIndexOdd(index);
    expect(result).toEqual(false);
  });

  it('expects "isIndexOdd to return true for 3', () => {
    const index = 3;

    const result: boolean = component.isIndexOdd(index);
    expect(result).toEqual(true);
  });

  it('expects "getTrackingStyle" to return the style for the tag', () => {
    const tracking: JobActivity = {
      datetimestamp: 'DATETIMESTAMP',
      description: '1',
      tag: {
        title: 'TAG-TITLE', backgroundColor: 'TAG-BACKGROUND-COLOR', foregroundColor: 'TAG-FOREGROUND-COLOR', original: false, showInModal: false,
      },
      connection: {},
    };
    const expected = 'color: TAG-FOREGROUND-COLOR; background-color: TAG-BACKGROUND-COLOR; border: 2px solid TAG-FOREGROUND-COLOR;';

    const result: string = component.getTrackingStyle(tracking);
    expect(result).toEqual(expected);
  });

  it('expects "getDatetime" to generate Y-M-D H:M:S format', () => {
    const date = '2025-01-01 20:00:00';
    const expected = '2025-01-01 20:00:00';

    const result: string = component.getDatetime(date);
    expect(result).toEqual(expected);
  });
});
