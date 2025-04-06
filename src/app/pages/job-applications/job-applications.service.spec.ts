import { TestBed } from '@angular/core/testing';

import { JobApplicationsService } from './job-applications.service';
import { JobActivity, JobApplication } from '../../core/interfaces/job-application';
import { FilterSettings, PagingSettings } from '../../core/interfaces/filter-state.interface';

describe('JobApplicationsService', () => {
  let service: JobApplicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobApplicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "init" to trigger', async () => {
    spyOn((service as any), 'loadFilterSettings').and.stub();
    spyOn((service as any), 'loadApplications').and.stub();
    spyOn((service as any), 'applyFilterAndPagingSettings').and.stub();
    service.initFired = false;

    await service.init();
    expect(service['loadFilterSettings']).toHaveBeenCalled();
    expect(service['loadApplications']).toHaveBeenCalled();
    expect(service['applyFilterAndPagingSettings']).toHaveBeenCalled();
    expect(service.initFired).toEqual(true);
  });

  it('expects "init" to not trigger', async () => {
    spyOn((service as any), 'loadFilterSettings').and.stub();
    spyOn((service as any), 'loadApplications').and.stub();
    spyOn((service as any), 'applyFilterAndPagingSettings').and.stub();
    service.initFired = true;

    await service.init();
    expect(service['loadFilterSettings']).not.toHaveBeenCalled();
    expect(service['loadApplications']).not.toHaveBeenCalled();
    expect(service['applyFilterAndPagingSettings']).not.toHaveBeenCalled();
    expect(service.initFired).toEqual(true);
  });

  it('expects "loadApplications" to handle retrieved data', async () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }];
    spyOn(service['storage'], 'getItem').and.resolveTo(applications);
    service['nextIndex'] = -1;

    await service['loadApplications']();
    expect(service['_applications']).toEqual(applications);
    expect(service['nextIndex']).toEqual(2);
  });

  it('expects "loadApplications" to handle no data', async () => {
    spyOn(service['storage'], 'getItem').and.resolveTo(null);
    service['nextIndex'] = -1;

    await service['loadApplications']();
    expect(service['_applications']).toEqual([]);
    expect(service['nextIndex']).toEqual(-1);
  });

  it('expects "getApplicationByIndex" to return the application with the correct index', () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }];
    service['_applications'] = applications;
    const index = 1;

    const result: JobApplication | null = service.getApplicationByIndex(index);
    expect(result).toEqual(applications[1]);
  });

  it('expects "getApplicationByIndex" to return null if index is not found', () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }];
    service['_applications'] = applications;
    const index = 2;

    const result: JobApplication | null = service.getApplicationByIndex(index);
    expect(result).toEqual(null);
  });

  it('expects "getArrayIndexOfApplication" to return the correct index', () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 2, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 1, title: 'TITLE-3', company: 'COMPANY-3', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }];
    const application: JobApplication = {
      index: 2, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    };
    service['_applications'] = applications;

    const result: number = service['getArrayIndexOfApplication'](application);
    expect(result).toEqual(1);
  });

  it('expects "saveNewApplication" to add index and save', async () => {
    const adding: JobApplication = {
      title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    };
    service['nextIndex'] = 2;
    service['_applications'] = [];
    spyOn((service as any), 'saveApplications').and.stub();

    await service.saveNewApplication(adding);
    expect(adding.index).toEqual(2);
    expect(service['nextIndex']).toEqual(3);
    expect(service['saveApplications']).toHaveBeenCalledWith([adding]);
  });

  it('expects "saveApplication" to replace the application data and save', async () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }];
    service['_applications'] = applications;
    const editing: JobApplication = {
      index: 0, title: 'TITLE-NEW', company: 'COMPANY-EDITING', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    };
    const expected: Array<JobApplication> = [{
      index: 0, title: 'TITLE-NEW', company: 'COMPANY-EDITING', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }];
    spyOn((service as any), 'saveApplications').and.stub();

    await service.saveApplication(editing);
    expect(service['saveApplications']).toHaveBeenCalledWith(expected);
  });

  it('expects "deleteApplication" to save the array without the deleted record', async () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }];
    service['_applications'] = applications;
    const deleting: JobApplication = {
      index: 0, title: 'TITLE-NEW', company: 'COMPANY-EDITING', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    };
    const expected: Array<JobApplication> = [{
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }];
    spyOn((service as any), 'saveApplications').and.stub();

    await service.deleteApplication(deleting);
    expect(service['saveApplications']).toHaveBeenCalledWith(expected);
  });

  it('expects "saveApplications" to sort and save', async () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 2, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 1, title: 'TITLE-3', company: 'COMPANY-3', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }];
    spyOn((service as any), 'sortApplications').and.returnValue(applications);
    spyOn(service['applicationsSignal'], 'set').and.stub();
    spyOn(service['storage'], 'setItem').and.resolveTo();
    spyOn((service as any), 'applyFilterAndPagingSettings').and.stub();

    await service['saveApplications'](applications);
    expect(service['_applications']).toEqual(applications);
    expect(service['applicationsSignal'].set).toHaveBeenCalledWith(applications);
    expect(service['storage'].setItem).toHaveBeenCalledWith('job-applications', 'job-squid--job-applications', applications);
    expect(service['applyFilterAndPagingSettings']).toHaveBeenCalled();
  });

  it('expects "sortApplications" to group by active and sort by job title in those groups', () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-4', company: 'COMPANY-4', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 1, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 2, title: 'TITLE-1', company: 'COMPANY-1', active: false,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 3, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }];
    const expected: Array<JobApplication> = [{
      index: 3, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 0, title: 'TITLE-4', company: 'COMPANY-4', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 2, title: 'TITLE-1', company: 'COMPANY-1', active: false,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 1, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }];
    spyOn((service as any), 'sortTrackingActivities').and.returnValue([]);

    const result: Array<JobApplication> = service['sortApplications'](applications);
    expect(result).toEqual([]);
    expect(service['sortTrackingActivities']).toHaveBeenCalledWith(expected);
  });

  it('expects "sortTrackingActivities" to sort the inner array of each application (most recent first)', () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }, {
        datetimestamp: '1', description: '',
      }, {
        datetimestamp: '4', description: '',
      }, {
        datetimestamp: '3', description: '',
      }, {
        datetimestamp: '2', description: '',
      }], connections: [],
    }];
    const expected: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }, {
        datetimestamp: '3', description: '',
      }, {
        datetimestamp: '2', description: '',
      }, {
        datetimestamp: '1', description: '',
      }, {
        datetimestamp: '1', description: '',
      }], connections: [],
    }];

    const result: Array<JobApplication> = service['sortTrackingActivities'](applications);
    expect(result).toEqual(expected);
  });

  it('expects "loadFilterSettings" to set the storted current state', async () => {
    const settings: FilterSettings = {
      showActiveApplicationsOnly: true,
      showMostRecent: true,
    };
    service['_filterState'] = {
      showActiveApplicationsOnly: false,
      showMostRecent: false,
    };
    spyOn(service['storage'], 'getItem').and.resolveTo(settings);
    spyOn(service['filterStateSignal'], 'set').and.stub();

    await service['loadFilterSettings']();
    expect(service['_filterState']).toEqual(settings);
    expect(service['filterStateSignal'].set).toHaveBeenCalledWith(settings);
  });

  it('expects "loadFilterSettings" to handle no state', async () => {
    service['_filterState'] = {
      showActiveApplicationsOnly: false,
      showMostRecent: false,
    };
    spyOn(service['storage'], 'getItem').and.resolveTo(null);
    spyOn(service['filterStateSignal'], 'set').and.stub();

    await service['loadFilterSettings']();
    expect(service['filterStateSignal'].set).not.toHaveBeenCalled();
  });

  it('expects "applyFilterAndPagingSettings" to get and set paging and application signals', () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }, {
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [], connections: [],
    }];
    service['_applications'] = applications;
    spyOn((service as any), 'sortOnMostRecentSetting').and.returnValue(applications);
    spyOn((service as any), 'filterOnActiveApplicationsOnlySetting').and.returnValue(applications);
    spyOn((service as any), 'setPageData').and.returnValue(applications);
    spyOn(service['pagingStateSignal'], 'set').and.stub();
    spyOn(service['applicationsSignal'], 'set').and.stub();

    service['applyFilterAndPagingSettings']();
    expect(service['pagingStateSignal'].set).toHaveBeenCalled();
    expect(service['applicationsSignal'].set).toHaveBeenCalled();
  });

  it('expects "sortOnMostRecentSetting" to sort on most recent (newest - forward)', () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }, {
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }], connections: [],
    }];
    const showMostRecent = true;
    const expected: Array<JobApplication> = [{
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }];

    const result: Array<JobApplication> = service['sortOnMostRecentSetting'](applications, showMostRecent);
    expect(result).toEqual(expected);
  });

  it('expects "sortOnMostRecentSetting" to sort on most recent (newest - backward)', () => {
    const applications: Array<JobApplication> = [{
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }];
    const showMostRecent = true;
    const expected: Array<JobApplication> = [{
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1', company: 'COMPANY-1', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }];

    const result: Array<JobApplication> = service['sortOnMostRecentSetting'](applications, showMostRecent);
    expect(result).toEqual(expected);
  });

  it('expects "sortOnMostRecentSetting" to sort on most recent (oldest - forward)', () => {
    const applications: Array<JobApplication> = [{
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1b', company: 'COMPANY-1b', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1a', company: 'COMPANY-1a', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }];
    const showMostRecent = false;
    const expected: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1b', company: 'COMPANY-1b', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1a', company: 'COMPANY-1a', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }, {
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }], connections: [],
    }];

    const result: Array<JobApplication> = service['sortOnMostRecentSetting'](applications, showMostRecent);
    expect(result).toEqual(expected);
  });

  it('expects "sortOnMostRecentSetting" to sort on most recent (oldest - backward)', () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1a', company: 'COMPANY-1a', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1b', company: 'COMPANY-1b', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }, {
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }], connections: [],
    }];
    const showMostRecent = false;
    const expected: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1a', company: 'COMPANY-1a', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1b', company: 'COMPANY-1b', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }, {
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }], connections: [],
    }];

    const result: Array<JobApplication> = service['sortOnMostRecentSetting'](applications, showMostRecent);
    expect(result).toEqual(expected);
  });

  it('expects "filterOnActiveApplicationsOnlySetting" to return filtered', () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1a', company: 'COMPANY-1a', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1b', company: 'COMPANY-1b', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }, {
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }], connections: [],
    }];
    const showActiveApplicationsOnly = true;
    const expected: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1a', company: 'COMPANY-1a', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1b', company: 'COMPANY-1b', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }];

    const result: Array<JobApplication> = service['filterOnActiveApplicationsOnlySetting'](applications, showActiveApplicationsOnly);
    expect(result).toEqual(expected);
  });

  it('expects "filterOnActiveApplicationsOnlySetting" to return unfiltered', () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1a', company: 'COMPANY-1a', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1b', company: 'COMPANY-1b', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }, {
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }], connections: [],
    }];
    const showActiveApplicationsOnly = false;
    const expected: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1a', company: 'COMPANY-1a', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1b', company: 'COMPANY-1b', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }, {
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }], connections: [],
    }];

    const result: Array<JobApplication> = service['filterOnActiveApplicationsOnlySetting'](applications, showActiveApplicationsOnly);
    expect(result).toEqual(expected);
  });

  it('expects "setPageData" to set state and return page of application data', () => {
    const applications: Array<JobApplication> = [{
      index: 0, title: 'TITLE-1a', company: 'COMPANY-1a', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 0, title: 'TITLE-1b', company: 'COMPANY-1b', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '1', description: '',
      }], connections: [],
    }, {
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }, {
      index: 3, title: 'TITLE-4', company: 'COMPANY-4', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '4', description: '',
      }], connections: [],
    }];
    service['_pagingState'].recordsPerPage = 2;
    service['_pagingState'].pageIndex = 1;
    const expected: Array<JobApplication> = [{
      index: 1, title: 'TITLE-2', company: 'COMPANY-2', active: true,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '2', description: '',
      }], connections: [],
    }, {
      index: 2, title: 'TITLE-3', company: 'COMPANY-3', active: false,
      description: '', requirements: '', links: [], tracking: [{
        datetimestamp: '3', description: '',
      }], connections: [],
    }];

    const results: Array<JobApplication> = service['setPageData'](applications);
    expect(results).toEqual(expected);
    expect(service['_pagingState'].totalPages).toEqual(3);
    expect(service['_pagingState'].totalRecords).toEqual(5);
  });

  it('expects "saveFilterSettings" to save', async () => {
    const settings: FilterSettings = {
      showActiveApplicationsOnly: false,
      showMostRecent: true,
    };
    spyOn(service['filterStateSignal'], 'set').and.stub();
    spyOn(service['storage'], 'setItem').and.resolveTo();
    spyOn((service as any), 'applyFilterAndPagingSettings').and.stub();

    await service.saveFilterSettings(settings);
    expect(service['_filterState']).toEqual(settings);
    expect(service['filterStateSignal'].set).toHaveBeenCalledWith(settings);
    expect(service['storage'].setItem).toHaveBeenCalledWith('job-applications', 'job-squid--filter-settings', settings);
    expect(service['applyFilterAndPagingSettings']).toHaveBeenCalled();
  });

  it('expects "toggleActiveApplications" to change and save the state', () => {
    service['_filterState'] = {
      showActiveApplicationsOnly: true,
      showMostRecent: true,
    };
    spyOn(service, 'saveFilterSettings').and.stub();

    service.toggleActiveApplications();
    expect(service.saveFilterSettings).toHaveBeenCalledWith({
      showActiveApplicationsOnly: false,
      showMostRecent: true,
    })
  });

  it('expects "toggleMostRecent" to change and save the state', () => {
    service['_filterState'] = {
      showActiveApplicationsOnly: true,
      showMostRecent: true,
    };
    spyOn(service, 'saveFilterSettings').and.stub();

    service.toggleMostRecent();
    expect(service.saveFilterSettings).toHaveBeenCalledWith({
      showActiveApplicationsOnly: true,
      showMostRecent: false,
    })
  });

  it('expects "toNextPage" to update state and filter', async () => {
    service['_pagingState'] = {
      pageIndex: 0,
      recordsPerPage: 25,
      totalPages: 3,
      totalRecords: 60,
    };
    spyOn(service['pagingStateSignal'], 'set').and.stub();
    spyOn((service as any), 'applyFilterAndPagingSettings').and.stub();
    const expected: PagingSettings = {
      pageIndex: 1,
      recordsPerPage: 25,
      totalPages: 3,
      totalRecords: 60,
    };

    await service.toNextPage();
    expect(service['pagingStateSignal'].set).toHaveBeenCalledWith(expected);
    expect(service['applyFilterAndPagingSettings']).toHaveBeenCalled();
  });

  it('expects "toLastPage" to update state and filter', async () => {
    service['_pagingState'] = {
      pageIndex: 0,
      recordsPerPage: 25,
      totalPages: 3,
      totalRecords: 60,
    };
    spyOn(service['pagingStateSignal'], 'set').and.stub();
    spyOn((service as any), 'applyFilterAndPagingSettings').and.stub();
    const expected: PagingSettings = {
      pageIndex: 2,
      recordsPerPage: 25,
      totalPages: 3,
      totalRecords: 60,
    };

    await service.toLastPage();
    expect(service['pagingStateSignal'].set).toHaveBeenCalledWith(expected);
    expect(service['applyFilterAndPagingSettings']).toHaveBeenCalled();
  });

  it('expects "toPreviousPage" to update state and filter', async () => {
    service['_pagingState'] = {
      pageIndex: 1,
      recordsPerPage: 25,
      totalPages: 3,
      totalRecords: 60,
    };
    spyOn(service['pagingStateSignal'], 'set').and.stub();
    spyOn((service as any), 'applyFilterAndPagingSettings').and.stub();
    const expected: PagingSettings = {
      pageIndex: 0,
      recordsPerPage: 25,
      totalPages: 3,
      totalRecords: 60,
    };

    await service.toPreviousPage();
    expect(service['pagingStateSignal'].set).toHaveBeenCalledWith(expected);
    expect(service['applyFilterAndPagingSettings']).toHaveBeenCalled();
  });
  it('expects "toFirstPage" to update state and filter', async () => {
    service['_pagingState'] = {
      pageIndex: 3,
      recordsPerPage: 25,
      totalPages: 3,
      totalRecords: 60,
    };
    spyOn(service['pagingStateSignal'], 'set').and.stub();
    spyOn((service as any), 'applyFilterAndPagingSettings').and.stub();
    const expected: PagingSettings = {
      pageIndex: 0,
      recordsPerPage: 25,
      totalPages: 3,
      totalRecords: 60,
    };

    await service.toFirstPage();
    expect(service['pagingStateSignal'].set).toHaveBeenCalledWith(expected);
    expect(service['applyFilterAndPagingSettings']).toHaveBeenCalled();
  });

  it('expects "getTimestamp" to return the newest datetimestamp', () => {
    const tracking: Array<JobActivity> = [{
      datetimestamp: '1', description: '',
    }, {
      datetimestamp: '3', description: '',
    }, {
      datetimestamp: '2', description: '',
    }, {
      datetimestamp: '4', description: '',
    }];

    const result: string = service['getTimestamp'](tracking);
    expect(result).toEqual('4');
  });

  it('expects "getTimestamp" to trigger utilites for current timestamp', () => {
    const tracking: Array<JobActivity> = [];
    spyOn(service.utilities, 'toDatetimestamp').and.returnValue('DATETIMESTAMP');

    const result: string = service['getTimestamp'](tracking);
    expect(result).toEqual('DATETIMESTAMP');
  });
});
