/* eslint-disable @angular-eslint/no-output-native */
import { Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';
import { JobApplication } from '../../../../core/interfaces/job-application';
import { JobApplicationsService } from '../../job-applications.service';

@Component({
  selector: 'job-squid-table-paging',
  standalone: false,
  
  templateUrl: './job-squid-table-paging.component.html',
  styleUrl: './job-squid-table-paging.component.css'
})
export class JobSquidTablePagingComponent {
  readonly service = inject(JobApplicationsService);
  
  _data: Array<JobApplication> = [];
  @Input()
  set data(value: Array<JobApplication>) {
    this._data = value;
    this.calculatePageDisplay();
  }

  @Output() change = new EventEmitter<Array<JobApplication>>();

  recordsPerPage = 25;
  pageIndex = 0;

  constructor() {
    effect(this.handlePagingChange.bind(this));
  }

  handlePagingChange(): void {
    const paging = this.service.pagingState();
    this.recordsPerPage = paging.recordsPerPage;
    this.pageIndex = paging.pageIndex;
  }

  get totalPages(): number {
    return Math.ceil(this._data.length / this.recordsPerPage);
  }

  calculatePageDisplay() {
    const startIndex = this.pageIndex * this.recordsPerPage;
    const endIndex = Math.min(startIndex + this.recordsPerPage, this._data.length);
    const pageData = this._data.slice(startIndex, endIndex);
    this.change.emit(pageData);
  }

  toFirstPage() {
    //
  }

  toPreviousPage() {
    //
  }

  toNextPage() {
    //
  }

  toLastPage() {
    //
  }

  isEnabled(type: string): boolean {
    switch (type) {
      case 'first':
        return this.pageIndex > 0;
      case 'previous':
        return this.pageIndex > 0;
      case 'next':
        return this.pageIndex < (this.totalPages - 1);
      case 'last':
        return this.pageIndex < (this.totalPages - 1);
      default:
        return false;
    }
  }
}
