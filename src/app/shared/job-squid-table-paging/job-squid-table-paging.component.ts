/* eslint-disable @angular-eslint/no-output-native */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobApplication } from '../../core/interfaces/job-application';

@Component({
  selector: 'job-squid-table-paging',
  standalone: false,
  
  templateUrl: './job-squid-table-paging.component.html',
  styleUrl: './job-squid-table-paging.component.css'
})
export class JobSquidTablePagingComponent {
  _data: Array<JobApplication> = [];
  @Input()
  set data(value: Array<JobApplication>) {
    this._data = value;
    this.currentPage = 0;
    this.calculatePageDisplay();
    console.log(value);
  }

  @Output() change = new EventEmitter<Array<JobApplication>>();

  recordsPerPage = 25;
  currentPage = 0;

  get totalPages(): number {
    return Math.ceil(this._data.length / this.recordsPerPage);
  }

  calculatePageDisplay() {
    const startIndex = this.currentPage * this.recordsPerPage;
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
        return this.currentPage > 0;
      case 'previous':
        return this.currentPage > 0;
      case 'next':
        return this.currentPage < (this.totalPages - 1);
      case 'last':
        return this.currentPage < (this.totalPages - 1);
      default:
        return false;
    }
  }
}
