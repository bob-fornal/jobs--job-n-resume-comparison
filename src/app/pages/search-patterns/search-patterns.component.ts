import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { SearchPatternsService } from './search-patterns.service';

import { SearchPattern } from '../../core/interfaces/search-pattern.interface';

@Component({
  selector: 'app-search-patterns',
  standalone: false,
  
  templateUrl: './search-patterns.component.html',
  styleUrl: './search-patterns.component.css'
})
export class SearchPatternsComponent {
  readonly router = inject(Router);
  readonly service = inject(SearchPatternsService);

  public patterns: Array<SearchPattern> = [];

  constructor() {
    this.init();
    effect(this.handleSearchPatternsEffect.bind(this));
  }

  init() {
    this.service.init();
  }

  handleSearchPatternsEffect() {
    const patterns = this.service.patterns();
    this.patterns = patterns;
  }

  add() {
    this.router.navigateByUrl('/search-patterns/add');
  }
}
