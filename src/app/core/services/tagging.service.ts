/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { inject, Injectable } from '@angular/core';

import { StorageLayerService } from './storage-layer.service';

import { Tag } from '../interfaces/tag';

import jobApplicationTags from '../../core/constants/job-application.tags.json';

@Injectable({
  providedIn: 'root'
})
export class TaggingService {
  readonly storage = inject(StorageLayerService);

  private tagOriginals: { [tag: string]: Array<Tag> } = {
    'job-applications': jobApplicationTags,
  };

  public tagTypes: { [key: string]: string } = {
    'job-applications': 'Job Applications'
  };

  public getTags = async (type: string): Promise<Array<Tag>> => {
    let tags: Array<Tag> = [];

    const results: Array<Tag> | null = await this.storage.getItem(type, 'job-squid--tags');
    tags = results !== null ? results : this.tagOriginals[type];

    return tags;
  }

  public setTags = async (type: string, tags: Array<Tag>): Promise<void> => {
    await this.storage.setItem(type, 'job-squid--tags', tags);
  };
}
