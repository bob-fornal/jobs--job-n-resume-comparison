import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TaggingService } from './tagging.service';

import { Tag } from '../interfaces/tag';

import jobApplicationTags from '../../core/constants/job-application.tags.json';

describe('TaggingService', () => {
  let service: TaggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "getTags" to return proper results', async () => {
    const type = 'TYPE';
    const expected = [{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false,
    }];
    service.signals[type] = signal([]);
    spyOn(service.storage, 'getItem').and.resolveTo(expected);
    spyOn(service.signals[type], 'set').and.stub();

    await service.getTags(type);
    expect(service.signals[type].set).toHaveBeenCalledWith(expected);
  });

  it('expects "getTags" to handle no tags', async () => {
    const type = 'TYPE';
    service['tagOriginals'][type] = [{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false,
    }];
    service.signals[type] = signal([]);
    spyOn(service.storage, 'getItem').and.resolveTo(null);
    spyOn(service.signals[type], 'set').and.stub();

    await service.getTags(type);
    expect(service.signals[type].set).toHaveBeenCalledWith(jasmine.any(Array));
  });

  it('expects "getTagMatch" to find the tag and return stored value', () => {
    const type = 'TYPE'
    service.signals[type] = signal([{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false,
    }])
    const tag: Tag = {
      title: 'Creation',
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      original: true,
      showInModal: false,
    };

    const result: Tag = service.getTagMatch(type, tag);
    expect(result.backgroundColor).toEqual('#f0efef');
    expect(result.foregroundColor).toEqual('#000011');
  });

  it('expects "getTagMatch" to find the tag and return original value if title not found', () => {
    const type = 'TYPE'
    service.signals[type] = signal([{
      title: 'Creation',
      backgroundColor: '#f0efef',
      foregroundColor: '#000011',
      original: true,
      showInModal: false,
    }])
    const tag: Tag = {
      title: 'Creation2',
      backgroundColor: '#ffffff',
      foregroundColor: '#ffffff',
      original: true,
      showInModal: false,
    };

    const result: Tag = service.getTagMatch(type, tag);
    expect(result.backgroundColor).toEqual('#ffffff');
    expect(result.foregroundColor).toEqual('#ffffff');
  });

  it('expects "setTags to set the item', async () => {
    const type = 'TYPE';
    const tags: Array<Tag> = [];
    service['signals'][type] = signal([]);
    spyOn(service['storage'], 'setItem').and.stub();
    spyOn(service['signals'][type], 'set').and.stub();

    await service.setTags(type, tags);
    expect(service['storage'].setItem).toHaveBeenCalledWith(type, 'job-squid--tags', tags);
    expect(service['signals'][type].set).toHaveBeenCalledWith(tags);
  });

  it('expects "resetTags" to reset the type', async () => {
    const type = 'TYPE';
    const expected = JSON.parse(JSON.stringify(jobApplicationTags));
    service['signals'][type] = signal([]);
    service['tagOriginals'][type] = expected;
    spyOn(service['storage'], 'removeItem').and.stub();
    spyOn(service['signals'][type], 'set').and.stub();

    await service.resetTags(type);
    expect(service['storage'].removeItem).toHaveBeenCalledWith(type, 'job-squid--tags');
    expect(service['signals'][type].set).toHaveBeenCalledWith(expected);
  });
});
