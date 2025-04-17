import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TagManagementComponent } from './tag-management.component';

import { MatIconModule } from '@angular/material/icon';

const mockActivatedRoute: any = {
  paramMap: of({ get: (key: string) => 'mockValue' }),
  queryParamMap: of({ get: (key: string) => 'mockQueryValue' }),
  snapshot: {
    params: {
      from: 'job-applications',
    },
    paramMap: { get: (key: string) => 'mockSnapshotValue' },
    queryParamMap: { get: (key: string) => 'mockSnapshotQueryValue' },
  },
  data: of({ key: 'mockData' })
};

import { MockTaggingService } from '../../shared/_specs/services/mock-tagging-service.spec';
import { TaggingService } from '../../core/services/tagging.service';
import { Tag } from '../../core/interfaces/tag';

describe('TagManagementComponent', () => {
  let component: TagManagementComponent;
  let fixture: ComponentFixture<TagManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
      ],
      declarations: [
        TagManagementComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: TaggingService, useValue: MockTaggingService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagManagementComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "init" to set from, get tags, and title', async () => {
    const tags: Array<Tag> = [{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false
    }, {
      title: 'Applied',
      backgroundColor: '#fdffb6',
      foregroundColor: '#264653',
      original: true,
      showInModal: true
    }];
    spyOn(component.service, 'getTags').and.resolveTo(tags);
    component.types = {
      'job-applications': 'Job Applications',
    };

    await component.init();
    expect(component.from).toEqual('job-applications');
    expect(component.currentTags).toEqual(tags);
    expect(component.currentTitle).toEqual('Job Applications');
  });

  it('expects "handleTagChange" to set current tags', () => {
    const tags: Array<Tag> = [{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false
    }, {
      title: 'Applied',
      backgroundColor: '#fdffb6',
      foregroundColor: '#264653',
      original: true,
      showInModal: true
    }];
    spyOn(component.service.signals, 'job-applications').and.returnValue(tags);

    component.handleTagChange();
    expect(component.currentTags).toEqual(tags);
  });

  it('expects "getTagStyle" to return non-reversed style', () => {
    const tag: Tag = {
      title:'Applied',
      backgroundColor: 'BACKGROUND',
      foregroundColor: 'FOREGROUND',
      original: true,
      showInModal: true
    };
    const expected = '--mdc-chip-elevated-container-color: BACKGROUND; --mdc-chip-label-text-color: FOREGROUND; --mdc-chip-outline-color: FOREGROUND; --mdc-chip-outline-width: 2px;';

    const result: string = component.getTagStyle(tag);
    expect(result).toEqual(expected);
  });

  it('expects "getTagStyle" to return reversed style', () => {
    const tag: Tag = {
      title:'Applied',
      backgroundColor: 'BACKGROUND',
      foregroundColor: 'FOREGROUND',
      original: true,
      showInModal: true
    };
    const expected = '--mdc-chip-elevated-container-color: FOREGROUND; --mdc-chip-label-text-color: BACKGROUND; --mdc-chip-outline-color: BACKGROUND; --mdc-chip-outline-width: 2px;';

    const result: string = component.getTagStyle(tag, true);
    expect(result).toEqual(expected);
  });

  it('expects "getEditingStyle" to get non-reversed style', () => {
    const tag: Tag = {
      title:'Applied',
      backgroundColor: 'BACKGROUND',
      foregroundColor: 'FOREGROUND',
      original: true,
      showInModal: true
    };
    const expected = '--tagging-background: BACKGROUND; --tagging-color: FOREGROUND;';

    const result: string = component.getEditingStyle(tag);
    expect(result).toEqual(expected);
  });

  it('expects "getEditingStyle" to get reversed style', () => {
    const tag: Tag = {
      title:'Applied',
      backgroundColor: 'BACKGROUND',
      foregroundColor: 'FOREGROUND',
      original: true,
      showInModal: true
    };
    const expected = '--tagging-background: FOREGROUND; --tagging-color: BACKGROUND;';

    const result: string = component.getEditingStyle(tag, true);
    expect(result).toEqual(expected);
  });

  it('expects "editTag" to get current tag and index', () => {
    const tags: Array<Tag> = [{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false
    }, {
      title: 'Applied',
      backgroundColor: '#fdffb6',
      foregroundColor: '#264653',
      original: true,
      showInModal: true
    }];
    const from = 'FROM';
    const tag = tags[1];
    component.from = from;
    component.currentTags = tags;

    component.editTag(from, tag);
    expect(component.editingCurrentTag).toEqual(tag);
    expect(component.editingIndex).toEqual(1);
  });

  it('expects "editTag" to get current tag and index', () => {
    const tags: Array<Tag> = [{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false
    }, {
      title: 'Applied',
      backgroundColor: '#fdffb6',
      foregroundColor: '#264653',
      original: true,
      showInModal: true
    }];
    const from = 'FROM';
    const tag = tags[1];
    component.from = 'NOT-FROM';
    component.currentTags = tags;
    component.editingIndex = -1;

    component.editTag(from, tag);
    expect(component.editingIndex).toEqual(-1);
  });

  it('expects "stopEditing" to reset editing values', () => {
    component.stopEditing();
    expect(component.editingCurrentTag).toBeNull();
    expect(component.editingIndex).toEqual(-1);
  });

  it('expects "saveTag" to set tags and stop editing', async () => {
    const tags: Array<Tag> = [{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false
    }, {
      title: 'Applied',
      backgroundColor: '#fdffb6',
      foregroundColor: '#264653',
      original: true,
      showInModal: true
    }];
    const from = 'job-applications';
    component.from = 'job-applications';
    component.editingCurrentTag = {
      title:'Applied',
      backgroundColor: 'BACKGROUND',
      foregroundColor: 'FOREGROUND',
      original: true,
      showInModal: true
    };
    spyOn(component.service.signals, 'job-applications').and.returnValue(tags);
    spyOn(component.service, 'setTags').and.resolveTo();
    spyOn(component, 'stopEditing').and.stub();

    await component.saveTag(1, from);
    expect(component.service.setTags).toHaveBeenCalledWith(from, tags);
    expect(component.stopEditing).toHaveBeenCalled();
  });

  it('expects "saveTag" to set tags and stop editing (no from)', async () => {
    const tags: Array<Tag> = [{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false
    }, {
      title: 'Applied',
      backgroundColor: '#fdffb6',
      foregroundColor: '#264653',
      original: true,
      showInModal: true
    }];
    component.from = 'job-applications';
    component.editingCurrentTag = {
      title:'Applied',
      backgroundColor: 'BACKGROUND',
      foregroundColor: 'FOREGROUND',
      original: true,
      showInModal: true
    };
    spyOn(component.service.signals, 'job-applications').and.returnValue(tags);
    spyOn(component.service, 'setTags').and.resolveTo();
    spyOn(component, 'stopEditing').and.stub();

    await component.saveTag(1);
    expect(component.service.setTags).toHaveBeenCalledWith('job-applications', tags);
    expect(component.stopEditing).toHaveBeenCalled();
  });

  it('expects "addNewTag" to set tags and stop editing', async () => {
    const tags: Array<Tag> = [{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false
    }, {
      title: 'Applied',
      backgroundColor: '#fdffb6',
      foregroundColor: '#264653',
      original: true,
      showInModal: true
    }];
    const newTag: Tag = {
      title: 'New Tag',
      backgroundColor: '#000000',
      foregroundColor: '#ffffff',
      original: false,
      showInModal: true,
    };
    component.from = 'job-applications';
    const expected: Array<Tag> = [...tags, newTag];
    spyOn(component.service.signals, 'job-applications').and.returnValue(tags);
    spyOn(component.service, 'setTags').and.resolveTo();
    spyOn(component, 'stopEditing').and.stub();

    await component.addNewTag('job-applications');
    expect(component.service.setTags).toHaveBeenCalledWith('job-applications', expected);
    expect(component.stopEditing).toHaveBeenCalled();
  });

  it('expects "addNewTag" to set tags and stop editing (no from)', async () => {
    const tags: Array<Tag> = [{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false
    }, {
      title: 'Applied',
      backgroundColor: '#fdffb6',
      foregroundColor: '#264653',
      original: true,
      showInModal: true
    }];
    const newTag: Tag = {
      title: 'New Tag',
      backgroundColor: '#000000',
      foregroundColor: '#ffffff',
      original: false,
      showInModal: true,
    };
    component.from = 'job-applications';
    const expected: Array<Tag> = [...tags, newTag];
    spyOn(component.service.signals, 'job-applications').and.returnValue(tags);
    spyOn(component.service, 'setTags').and.resolveTo();
    spyOn(component, 'stopEditing').and.stub();

    await component.addNewTag();
    expect(component.service.setTags).toHaveBeenCalledWith('job-applications', expected);
    expect(component.stopEditing).toHaveBeenCalled();
  });

  it('expects "resetTags" to trigger service reset and stop editing', () => {
    component.from = 'job-applications';
    spyOn(component.service, 'resetTags').and.stub();
    spyOn(component, 'stopEditing').and.stub();

    component.resetTags('job-applications');
    expect(component.service.resetTags).toHaveBeenCalled();
    expect(component.stopEditing).toHaveBeenCalled();
  });

  it('expects "resetTags" to trigger service reset and stop editing (no from)', () => {
    component.from = 'job-applications';
    spyOn(component.service, 'resetTags').and.stub();
    spyOn(component, 'stopEditing').and.stub();

    component.resetTags();
    expect(component.service.resetTags).toHaveBeenCalled();
    expect(component.stopEditing).toHaveBeenCalled();
  });

  it('expects "deleteTag" to delete tag and stop editing', async () => {
    const tags: Array<Tag> = [{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false
    }, {
      title: 'Applied',
      backgroundColor: '#fdffb6',
      foregroundColor: '#264653',
      original: true,
      showInModal: true
    }];
    component.from = 'job-applications';
    const expected: Array<Tag> = [...tags];
    expected.splice(1, 1);
    spyOn(component.service.signals, 'job-applications').and.returnValue(tags);
    spyOn(component.service, 'setTags').and.stub();
    spyOn(component, 'stopEditing').and.stub();

    await component.deleteTag(1, 'job-applications');
    expect(component.service.setTags).toHaveBeenCalledWith('job-applications', expected);
    expect(component.stopEditing).toHaveBeenCalled();
  });

  it('expects "deleteTag" to delete tag and stop editing (no from)', async () => {
    const tags: Array<Tag> = [{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false
    }, {
      title: 'Applied',
      backgroundColor: '#fdffb6',
      foregroundColor: '#264653',
      original: true,
      showInModal: true
    }];
    component.from = 'job-applications';
    const expected: Array<Tag> = [...tags];
    expected.splice(1, 1);
    spyOn(component.service.signals, 'job-applications').and.returnValue(tags);
    spyOn(component.service, 'setTags').and.stub();
    spyOn(component, 'stopEditing').and.stub();

    await component.deleteTag(1);
    expect(component.service.setTags).toHaveBeenCalledWith('job-applications', expected);
    expect(component.stopEditing).toHaveBeenCalled();
  });

  it('expects "back" to use the params to navigate to the previous page', () => {
    spyOn(component.router, 'navigateByUrl').and.stub();

    component.back();
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('/job-applications');
  });
});
