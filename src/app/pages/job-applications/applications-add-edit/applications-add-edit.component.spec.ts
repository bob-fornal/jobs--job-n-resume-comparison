import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ApplicationsAddEditComponent } from './applications-add-edit.component';

const mockActivatedRoute: any = {
  paramMap: of({ get: (key: string) => 'mockValue' }),
  queryParamMap: of({ get: (key: string) => 'mockQueryValue' }),
  snapshot: {
    params: {
      type: 'add',
    },
    paramMap: { get: (key: string) => 'mockSnapshotValue' },
    queryParamMap: { get: (key: string) => 'mockSnapshotQueryValue' },
  },
  data: of({ key: 'mockData' })
};

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JobApplication } from '../../../core/interfaces/job-application';

describe('ApplicationsAddEditComponent', () => {
  let component: ApplicationsAddEditComponent;
  let fixture: ComponentFixture<ApplicationsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,

        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
      declarations: [
        ApplicationsAddEditComponent,
      ],
      providers: [
        provideAnimationsAsync(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "init" to handle initializing for add', async () => {
    mockActivatedRoute.snapshot.params.type = 'add';
    component.index = -1;
    spyOn(component, 'initApplicationStructure').and.stub();
    spyOn(component.service, 'init').and.resolveTo();
    spyOn(component, 'initEdit').and.stub();

    await component.init();
    expect(component.type).toEqual('add');
    expect(component.index).toEqual(-1);
    expect(component.initApplicationStructure).toHaveBeenCalled();
    expect(component.service.init).toHaveBeenCalled();
    expect(component.initEdit).toHaveBeenCalled();
  });

  it('expects "init" to handle initializing for edit', async () => {
    mockActivatedRoute.snapshot.params.type = 'edit';
    mockActivatedRoute.snapshot.params.index = 1;
    component.index = -1;
    spyOn(component, 'initApplicationStructure').and.stub();
    spyOn(component.service, 'init').and.resolveTo();
    spyOn(component, 'initEdit').and.stub();

    await component.init();
    expect(component.type).toEqual('edit');
    expect(component.index).toEqual(1);
    expect(component.initApplicationStructure).toHaveBeenCalled();
    expect(component.service.init).toHaveBeenCalled();
    expect(component.initEdit).toHaveBeenCalled();
  });

  it('expects "initApplicationStructure" to setup application', () => {
    component.initApplicationStructure();
    expect(component.application).toBeTruthy();
  });

  it('expects "initEdit" to get the application and path the structure', () => {
    const application: JobApplication = {
      index: 3,
      title: 'TITLE-3',
      company: 'COMPANY-3',
      active: true,
      description: '',
      requirements: '',
      links: [],
      tracking: [],
      connections: [],
    };
    component.index = 3;
    spyOn(component.service, 'getApplicationByIndex').and.returnValue(application);
    spyOn(component, 'patchStructure').and.stub();

    component.initEdit();
    expect(component.patchStructure).toHaveBeenCalled();
  });

  it('expects "initEdit" to not change', () => {
    component.index = -1;
    spyOn(component.service, 'getApplicationByIndex').and.returnValue(null);
    spyOn(component, 'patchStructure').and.stub();

    component.initEdit();
    expect(component.patchStructure).not.toHaveBeenCalled();
  });

  it('expects "patchStructure" to update the application', () => {
    const application: JobApplication = {
      index: 3,
      title: 'TITLE-3',
      company: 'COMPANY-3',
      active: true,
      description: '',
      requirements: '',
      links: [{
        url: 'URL',
        type: 'TYPE',
      }],
      tracking: [{
        datetimestamp: 'DATETIMESTAMP',
        description: 'DESCRIPTION',
      }],
      connections: [],
    };
    const expected: any = {
      title: application.title,
      company: application.company,
      active: application.active,
      description: application.description,
      requirements: application.requirements,
    };
    spyOn(component.application, 'patchValue').and.stub();

    component.patchStructure(application);
    expect(component.application.patchValue).toHaveBeenCalledWith(expected);
  });

  it('expects "get linkControls" to return links as a FormArray', () => {
    const application: JobApplication = {
      index: 3,
      title: 'TITLE-3',
      company: 'COMPANY-3',
      active: true,
      description: '',
      requirements: '',
      links: [{
        url: 'URL',
        type: 'TYPE',
      }],
      tracking: [{
        datetimestamp: 'DATETIMESTAMP',
        description: 'DESCRIPTION',
      }],
      connections: [],
    };
    component.patchStructure(application);

    const result: FormArray = component.linkControls;
    expect(result).toEqual(jasmine.any(FormArray));
  });

  it('expects "getType" to return and empty string if type is empty', () => {
    component.type = '';

    const result: string = component.getType();
    expect(result).toEqual('');
  });

  it('expects "getType" to return title correctly (edit)', () => {
    component.type = 'edit';

    const result: string = component.getType();
    expect(result).toEqual('Edit');
  });

  it('expects "getType" to return title correctly (add)', () => {
    component.type = 'add';

    const result: string = component.getType();
    expect(result).toEqual('Add');
  });

  it('expects "back" to navigate to job-applications', () => {
    spyOn(component.router, 'navigateByUrl').and.stub();

    component.back();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/job-applications');
  });

  it('expects "addLinkItem" to add an empty item', () => {
    component.addLinkItem();
    const links: FormArray = component.application.get('links') as FormArray;
    expect(links.length).toEqual(1);
  });

  it('expects "deleteLinkItem" to delete a link index', () => {
    component.addLinkItem();
    const index = 0;

    component.deleteLinkItem(index);
    const links: FormArray = component.application.get('links') as FormArray;
    expect(links.length).toEqual(0);
  });

  it('expects "save" to add an application', async () => {
    const application: JobApplication = {
      title: 'TITLE-3',
      company: 'COMPANY-3',
      active: true,
      description: '',
      requirements: '',
      links: [{
        url: 'URL',
        type: 'TYPE',
      }],
      tracking: [],
      connections: [],
    };
    const expected: JobApplication = {
      title: 'TITLE-3',
      company: 'COMPANY-3',
      active: true,
      description: '',
      requirements: '',
      links: [{
        url: 'URL',
        type: 'TYPE',
      }],
      tracking: [{
        datetimestamp: 'DATETIMESTAMP',
        description: 'Job Application Creation',
        tag: {
          title: 'Creation',
          backgroundColor: '#f0efef',
          foregroundColor: '#000011',
          original: true,
          showInModal: false,
        }
      }],
      connections: [],
    };
    component.patchStructure(application);
    component.type = 'add';
    spyOn(component.utilities, 'toDatetimestamp').and.returnValue('DATETIMESTAMP');
    spyOn(component.service, 'saveNewApplication').and.stub();
    spyOn(component, 'back').and.stub();

    await component.save();
    expect(component.service.saveNewApplication).toHaveBeenCalledWith(expected);
    expect(component.back).toHaveBeenCalled();
  });

  it('expects "save" to save an application', async () => {
    const application: JobApplication = {
      title: 'TITLE-3',
      company: 'COMPANY-3',
      active: true,
      description: '',
      requirements: '',
      links: [{
        url: 'URL',
        type: 'TYPE',
      }],
      tracking: [],
      connections: [],
    };
    const expected: JobApplication = {
      title: 'TITLE-3',
      company: 'COMPANY-3',
      index: 4,
      active: true,
      description: '',
      requirements: '',
      links: [{
        url: 'URL',
        type: 'TYPE',
      }],
      tracking: [],
      connections: [],
    };
    component.patchStructure(application);
    component.type = 'edit';
    component.index = 4;
    spyOn(component.service, 'saveApplication').and.stub();
    spyOn(component, 'back').and.stub();

    await component.save();
    expect(component.service.saveApplication).toHaveBeenCalledWith(expected);
    expect(component.back).toHaveBeenCalled();
  });
});
