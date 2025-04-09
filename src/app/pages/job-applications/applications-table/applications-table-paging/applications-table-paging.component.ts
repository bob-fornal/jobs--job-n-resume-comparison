/* eslint-disable @angular-eslint/no-output-native */
import { ChangeDetectorRef, Component, effect, EventEmitter, inject, Input, Output } from '@angular/core';
import { JobApplication } from '../../../../core/interfaces/job-application';
import { JobApplicationsService } from '../../job-applications.service';

@Component({
  selector: 'applications-table-paging',
  standalone: false,
  
  templateUrl: './applications-table-paging.component.html',
  styleUrl: './applications-table-paging.component.css'
})
export class ApplicationsTablePagingComponent {
  readonly changeRef = inject(ChangeDetectorRef);
  readonly service = inject(JobApplicationsService);
  
  @Output() change = new EventEmitter<Array<JobApplication>>();

  recordsPerPage = 25;
  pageIndex = 0;
  totalPages = 0;
  totalRecords = 0;

  constructor() {
    effect(this.handlePagingChange.bind(this));
  }

  handlePagingChange(): void {
    const paging = this.service.pagingState();
    this.recordsPerPage = paging.recordsPerPage;
    this.pageIndex = paging.pageIndex;
    this.totalPages = paging.totalPages;
    this.totalRecords = paging.totalRecords;
  }

  async toFirstPage() {
    await this.service.toFirstPage();
    this.changeRef.detectChanges();
  }

  async toPreviousPage() {
    await this.service.toPreviousPage();
    this.changeRef.detectChanges();
  }

  async toNextPage() {
    await this.service.toNextPage();
    this.changeRef.detectChanges();
  }

  async toLastPage() {
    await this.service.toLastPage();
    this.changeRef.detectChanges();
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
