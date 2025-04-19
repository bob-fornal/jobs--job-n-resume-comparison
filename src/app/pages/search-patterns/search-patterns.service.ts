import { inject, Injectable, Signal, signal } from '@angular/core';

import { SearchPattern } from '../../core/interfaces/search-pattern.interface';

import { StorageLayerService } from '../../core/services/storage-layer.service';

@Injectable({
  providedIn: 'root'
})
export class SearchPatternsService {
  readonly storage = inject(StorageLayerService);

  private _patterns: Array<SearchPattern> = [];
  private patternSignal = signal(this._patterns);
  readonly patterns: Signal<Array<SearchPattern>> = this.patternSignal.asReadonly();

  public initFired = false;
  private nextIndex = 0;

  public init = async (): Promise<void> => {
    if (this.initFired === false) {
      await this.loadSearchPatterns();
      this.initFired = true;
    }
  };

  private async loadSearchPatterns(): Promise<void> {
    const patterns: Array<SearchPattern> | null = await this.storage.getItem('search-patterns', 'job-squid--search-patterns');
    if (patterns === null) return;

    this._patterns = patterns;
    patterns.forEach((pattern: SearchPattern) => {
      if (pattern.index > this.nextIndex) this.nextIndex = pattern.index;
    });
    this.nextIndex++;
  }
}
