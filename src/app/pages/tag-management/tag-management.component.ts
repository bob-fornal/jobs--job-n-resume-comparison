import { Component, inject } from '@angular/core';
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

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    const from: string = this.activatedRoute.snapshot.params['from'];
    this.from = from;

    this.currentTags = await this.service.getTags(from);
    this.currentTitle = this.types[from];

  };

  getTagStyle(tag: Tag, reverse = false): string {
    if (reverse === false) {
      return `--mdc-chip-elevated-container-color: ${tag.backgroundColor}; --mdc-chip-label-text-color: ${tag.foregroundColor}; --mdc-chip-outline-color: ${tag.foregroundColor}; --mdc-chip-outline-width: 2px;`;
    } else {
      return `--mdc-chip-elevated-container-color: ${tag.backgroundColor}; --mdc-chip-label-text-color: ${tag.foregroundColor}; --mdc-chip-outline-color: ${tag.foregroundColor}; --mdc-chip-outline-width: 2px;`;
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
    }
  }

  back(): void {
    const from: string = this.activatedRoute.snapshot.params['from'];
    this.router.navigateByUrl(`/${from}`);
  }
}
