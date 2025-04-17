import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TaggingService } from '../../core/services/tagging.service';
import { Tag } from '../../core/interfaces/tag';

@Component({
  selector: 'app-tag-management',
  standalone: false,
  
  templateUrl: './tag-management.component.html',
  styleUrl: './tag-management.component.css'
})
export class TagManagementComponent {
  readonly activatedRoute = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly service = inject(TaggingService);
  
  types: { [key: string]: string } = this.service.tagTypes;

  color = '';

  from = '';
  currentTitle = '';
  currentTags: Array<Tag> = [];
  editingCurrentTag: Tag | null = null;
  editingIndex = -1;

  constructor() {
    this.init();
    effect(this.handleTagChange.bind(this));
  }

  async init(): Promise<void> {
    const from: string = this.activatedRoute.snapshot.params['from'];
    this.from = from;

    this.currentTags = await this.service.getTags(from);
    this.currentTitle = this.types[from];
  };

  handleTagChange(): void {
    const tags: Array<Tag> = this.service.signals[this.from]();
    this.currentTags = tags;
  }

  getTagStyle(tag: Tag, reverse = false): string {
    if (reverse === false) {
      return `--mdc-chip-elevated-container-color: ${tag.backgroundColor}; --mdc-chip-label-text-color: ${tag.foregroundColor}; --mdc-chip-outline-color: ${tag.foregroundColor}; --mdc-chip-outline-width: 2px;`;
    } else {
      return `--mdc-chip-elevated-container-color: ${tag.foregroundColor}; --mdc-chip-label-text-color: ${tag.backgroundColor}; --mdc-chip-outline-color: ${tag.backgroundColor}; --mdc-chip-outline-width: 2px;`;
    }
  };

  getEditingStyle(tag: Tag, reverse = false): string {
    if (reverse === false) {
      return `--tagging-background: ${tag.backgroundColor}; --tagging-color: ${tag.foregroundColor};`;
    } else {
      return `--tagging-background: ${tag.foregroundColor}; --tagging-color: ${tag.backgroundColor};`;
    }
  }

  editTag(from: string, tag: Tag): void {
    if (from === this.from) {
      this.editingCurrentTag = { ...tag };
      this.editingIndex = this.currentTags.findIndex((item: Tag) => {
        const matchTitle: boolean = item.title === tag.title;
        const matchBG: boolean = item.backgroundColor === tag.backgroundColor;
        const matchFG: boolean = item.foregroundColor === tag.foregroundColor;
        return matchTitle && matchBG && matchFG;
      });
    }
  }

  stopEditing(): void {
    this.editingCurrentTag = null;
    this.editingIndex = -1;
  }

  async saveTag(index: number, from = ''): Promise<void> {
    const useFrom: string = from === '' ? this.from : from;
    const adjusted: Array<Tag> = this.service.signals[useFrom]();
    adjusted[index] = this.editingCurrentTag!;
    await this.service.setTags(useFrom, adjusted);

    if (from === this.from) {
      this.currentTags = [...adjusted];
    }
    this.stopEditing();
  }

  async addNewTag(from = ''): Promise<void> {
    const newTag: Tag = {
      title: 'New Tag',
      backgroundColor: '#000000',
      foregroundColor: '#ffffff',
      original: false,
      showInModal: true,
    };
    const useFrom: string = from === '' ? this.from : from;
    const adjusted: Array<Tag> = this.service.signals[useFrom]();
    adjusted.push(newTag);
    await this.service.setTags(useFrom, adjusted);

    if (from === this.from) {
      this.currentTags = [...adjusted];
    }
    this.stopEditing();
  }

  resetTags(from = ''): void {
    const useFrom: string = from === '' ? this.from : from;
    this.service.resetTags(useFrom);
    this.stopEditing();
  }

  async deleteTag(index: number, from = ''): Promise<void> {
    const useFrom: string = from === '' ? this.from : from;
    const adjusted: Array<Tag> = this.service.signals[useFrom]();
    adjusted.splice(index, 1);
    await this.service.setTags(useFrom, adjusted);
    this.stopEditing();
  }

  back(): void {
    const from: string = this.activatedRoute.snapshot.params['from'];
    this.router.navigateByUrl(`/${from}`);
  }
}
