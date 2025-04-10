import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { provideNativeDateAdapter } from '@angular/material/core';

import { ApplicationsTrackingModalComponent } from './applications-tracking-modal.component';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Tag } from '../../../../core/interfaces/tag';
import { JobActivity, JobApplication } from '../../../../core/interfaces/job-application';

describe('ApplicationsTrackingModalComponent', () => {
  let component: ApplicationsTrackingModalComponent;
  let fixture: ComponentFixture<ApplicationsTrackingModalComponent>;

  const mockDialogData = { data: { tagIndex: -1, datetimestamp: '', description: '', tag: {} } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,

        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatTimepickerModule,
      ],
      declarations: [
        ApplicationsTrackingModalComponent,
      ],
      providers: [
        provideAnimationsAsync(),
        provideNativeDateAdapter(),
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: { close: () => ({}) } },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsTrackingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "init" to trigger get tags and set tag data', async () => {
    component.data.tagIndex = 3;
    component.data.datetimestamp = '2025-02-02 13:00:00';
    component.data.description = 'DESCRIPTION';
    component.data.tag = {
      title: 'TITLE', backgroundColor: 'BACKGROUND-COLOR', foregroundColor: 'FOREGROUND-COLOR', original: false, showInModal: true,
    };
    spyOn(component.tagService, 'getTags').and.resolveTo();

    await component.init();
    expect(component.tagService.getTags).toHaveBeenCalledWith('job-applications');
    expect(component.datetimeValue).toEqual(new Date(component.data.datetimestamp));
    expect(component.description).toEqual(component.data.description);
    expect(component.tag).toEqual(component.data.tag);
  });

  it('expects "handleTagging" to set the tags and tag when index = -1', () => {
    const tags: Array<Tag> = [{
      "title": "Creation",
      "backgroundColor": "#f0efef",
      "foregroundColor": "#000011",
      "original": true,
      "showInModal": false
    },
    {
      "title": "Applied",
      "backgroundColor": "#fdffb6",
      "foregroundColor": "#264653",
      "original": true,
      "showInModal": true
    }];
    spyOn(component.tagService.signals, 'job-applications').and.returnValue(tags);
    component.data.tagIndex = -1;

    component.handleTagging();
    expect(component.tag).toEqual(tags[1]);
  });

  it('expects "handleTagging" to set the tags and tag when index = -1', () => {
    const tags: Array<Tag> = [{
      "title": "Creation",
      "backgroundColor": "#f0efef",
      "foregroundColor": "#000011",
      "original": true,
      "showInModal": false
    },
    {
      "title": "Applied",
      "backgroundColor": "#fdffb6",
      "foregroundColor": "#264653",
      "original": true,
      "showInModal": true
    }];
    const tag: Tag = {
      title: 'TITLE', backgroundColor: 'BACKGROUND-COLOR', foregroundColor: 'FOREGROUND-COLOR', original: false, showInModal: true,
    };
    component.data.tag = tag;
    spyOn(component.tagService.signals, 'job-applications').and.returnValue(tags);
    component.data.tagIndex = 1;

    component.handleTagging();
    expect(component.tag).toEqual(tag);
  });

  it('expects "getTagTitle" to return empty string if tag is undefined', () => {
    component.tag = undefined;

    const result: string = component.tagTitle;
    expect(result).toEqual('');
  });

  it('expects "getTagTitle" to return title of tag', () => {
    const tag: Tag = {
      title: 'TITLE', backgroundColor: 'BACKGROUND-COLOR', foregroundColor: 'FOREGROUND-COLOR', original: false, showInModal: true,
    };
    component.data.tag = tag;
    component.tag = tag;

    const result: string = component.tagTitle;
    expect(result).toEqual('TITLE');
  });

  it('expects "displayTags" to return tags that can be shown', () => {
    const tags: Array<Tag> = [{
      "title": "Creation",
      "backgroundColor": "#f0efef",
      "foregroundColor": "#000011",
      "original": true,
      "showInModal": false
    },
    {
      "title": "Applied",
      "backgroundColor": "#fdffb6",
      "foregroundColor": "#264653",
      "original": true,
      "showInModal": true
    }];
    component.tags = tags;
    const expected: Array<Tag> = [tags[1]];

    const result: Array<Tag> = component.displayTags;
    expect(result).toEqual(expected);
  });

  it('expects "save" to add tracking, save, and close the dialog', () => {
    const application: JobApplication = {
      title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [],
    };
    component.data.index = 3;
    component.data.tagIndex = -1;
    component.description = 'DESCRIPTION';
    const tag: Tag = {
      title: 'TITLE', backgroundColor: 'BACKGROUND-COLOR', foregroundColor: 'FOREGROUND-COLOR', original: false, showInModal: true,
    };
    component.tag = tag;
    spyOn(component.service, 'getApplicationByIndex').and.returnValue(application);
    spyOn(component.utilities, 'toDatetimestamp').and.returnValue('DATETIMESTAMP');
    spyOn(component.service, 'saveApplication').and.stub();
    spyOn(component.dialogRef, 'close').and.stub();
    const expected: JobApplication = application;
    expected.tracking = [{
      datetimestamp: 'DATETIMESTAMP',
      description: 'DESCRIPTION',
      tag: tag,
    }];

    component.save();
    expect(component.service.saveApplication).toHaveBeenCalledWith(expected);
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('expects "save" to edit tracking, save, and close the dialog', () => {
    const tag: Tag = {
      title: 'TITLE', backgroundColor: 'BACKGROUND-COLOR', foregroundColor: 'FOREGROUND-COLOR', original: false, showInModal: true,
    };
    const application: JobApplication = {
      title: 'TITLE', company: 'COMPANY', active: true, description: '', requirements: '',
      links: [], connections: [], tracking: [{
        datetimestamp: 'DATETIMESTAMP-1',
        description: 'DESCRIPTION-1',
        tag: tag,
      }, {
        datetimestamp: 'DATETIMESTAMP-2',
        description: 'DESCRIPTION-2',
        tag: tag,
      }],
    };
    component.data.index = 3;
    component.data.tagIndex = 1;
    component.description = 'DESCRIPTION';
    component.tag = tag;
    spyOn(component.service, 'getApplicationByIndex').and.returnValue(application);
    spyOn(component.utilities, 'toDatetimestamp').and.returnValue('DATETIMESTAMP');
    spyOn(component.service, 'saveApplication').and.stub();
    spyOn(component.dialogRef, 'close').and.stub();
    const expected: JobApplication = application;
    expected.tracking = [{
      datetimestamp: 'DATETIMESTAMP-1',
      description: 'DESCRIPTION-1',
      tag: tag,
    }, {
      datetimestamp: 'DATETIMESTAMP-2a',
      description: 'DESCRIPTION-2a',
      tag: tag,
    }];

    component.save();
    expect(component.service.saveApplication).toHaveBeenCalledWith(expected);
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('expects "cancel" to close the dialog', () => {
    spyOn(component.dialogRef, 'close').and.stub();

    component.cancel();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('expects "getTagStyle" to return an empty string', () => {
    const result: string = component.getTagStyle(undefined);
    expect(result).toEqual('');
  });

  it('expects "getTagStyle" to return style string', () => {
    const tag: Tag = {
      title: 'TITLE', backgroundColor: 'BACKGROUND-COLOR', foregroundColor: 'FOREGROUND-COLOR', original: false, showInModal: true,
    };
    const expected = 'color: FOREGROUND-COLOR; background-color: BACKGROUND-COLOR;';

    const result: string = component.getTagStyle(tag);
    expect(result).toEqual(expected);
  });

  it('expects "selectTag" to set the component tag', () => {
    const tag: Tag = {
      title: 'TITLE', backgroundColor: 'BACKGROUND-COLOR', foregroundColor: 'FOREGROUND-COLOR', original: false, showInModal: true,
    };

    component.selectTag(tag);
    expect(component.tag).toEqual(tag);
  });
});
