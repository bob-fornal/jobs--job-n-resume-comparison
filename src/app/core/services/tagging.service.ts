/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { inject, Injectable, signal } from '@angular/core';

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

  public signals: { [key: string]: any } = {
    'job-applications': signal([]),
  };

  private emptyTag: Tag = {
    title: '',
    backgroundColor: '',
    foregroundColor: '',
    original: false,
    showInModal: false,
  };

  public getTags = async (type: string): Promise<any> => {
    const results: Array<Tag> | null = await this.storage.getItem(type, 'job-squid--tags');
    const tags = results !== null ? results : JSON.parse(JSON.stringify(this.tagOriginals[type]));
    this.signals[type].set(tags);
  };

  public getTagMatch = (type: string, tag: Tag): Tag => {
    const tags: Array<Tag> = this.signals[type]();
    const match: Tag | undefined = tags.find((matchTag: Tag) => matchTag.title === tag.title);
    return match || tag;
  };

  public getEmptyTag = (): Tag => ({ ...this.emptyTag });

  public setTags = async (type: string, tags: Array<Tag>): Promise<void> => {
    await this.storage.setItem(type, 'job-squid--tags', tags);
    this.signals[type].set(tags);
  };

  public resetTags = async (type: string): Promise<any> => {
    await this.storage.removeItem(type, 'job-squid--tags');
    this.signals[type].set(JSON.parse(JSON.stringify(this.tagOriginals[type])));
  };
}
