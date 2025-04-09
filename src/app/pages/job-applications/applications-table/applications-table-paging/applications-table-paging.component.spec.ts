import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsTablePagingComponent } from './applications-table-paging.component';

import { MatIconModule } from '@angular/material/icon';
import { PagingSettings } from '../../../../core/interfaces/filter-state.interface';

describe('ApplicationsTablePagingComponent', () => {
  let component: ApplicationsTablePagingComponent;
  let fixture: ComponentFixture<ApplicationsTablePagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
      ],
      declarations: [
        ApplicationsTablePagingComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsTablePagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "handlePageChange" to update values to paging', () => {
    const paging: PagingSettings = {
      recordsPerPage: 25,
      pageIndex: 4,
      totalPages: 5,
      totalRecords: 120,
    };
    spyOn(component.service, 'pagingState').and.returnValue(paging);

    component.handlePagingChange();
    expect(component.recordsPerPage).toEqual(25);
    expect(component.pageIndex).toEqual(4);
    expect(component.totalPages).toEqual(5);
    expect(component.totalRecords).toEqual(120);
  });

  it('expects "toFirstPage" to trigger service', async () => {
    spyOn(component.service, 'toFirstPage').and.resolveTo();
    spyOn(component.changeRef, 'detectChanges').and.stub();

    await component.toFirstPage();
    expect(component.service.toFirstPage).toHaveBeenCalled();
    expect(component.changeRef.detectChanges).toHaveBeenCalled();
  });

  it('expects "toPreviousPage" to trigger service', async () => {
    spyOn(component.service, 'toPreviousPage').and.resolveTo();
    spyOn(component.changeRef, 'detectChanges').and.stub();

    await component.toPreviousPage();
    expect(component.service.toPreviousPage).toHaveBeenCalled();
    expect(component.changeRef.detectChanges).toHaveBeenCalled();
  });

  it('expects "toNextPage" to trigger service', async () => {
    spyOn(component.service, 'toNextPage').and.resolveTo();
    spyOn(component.changeRef, 'detectChanges').and.stub();

    await component.toNextPage();
    expect(component.service.toNextPage).toHaveBeenCalled();
    expect(component.changeRef.detectChanges).toHaveBeenCalled();
  });

  it('expects "toLastPage" to trigger service', async () => {
    spyOn(component.service, 'toLastPage').and.resolveTo();
    spyOn(component.changeRef, 'detectChanges').and.stub();

    await component.toLastPage();
    expect(component.service.toLastPage).toHaveBeenCalled();
    expect(component.changeRef.detectChanges).toHaveBeenCalled();
  });

  it('expects "isEnabled" to return true for first if pageIndex > 0', () => {
    const type = 'first';
    component.pageIndex = 1;

    const result: boolean = component.isEnabled(type);
    expect(result).toEqual(true);
  });

  it('expects "isEnabled" to return false for first if pageIndex is 0', () => {
    const type = 'first';
    component.pageIndex = 0;

    const result: boolean = component.isEnabled(type);
    expect(result).toEqual(false);
  });

  it('expects "isEnabled" to return true for previous if pageIndex > 0', () => {
    const type = 'previous';
    component.pageIndex = 1;

    const result: boolean = component.isEnabled(type);
    expect(result).toEqual(true);
  });

  it('expects "isEnabled" to return false for previous if pageIndex is 0', () => {
    const type = 'previous';
    component.pageIndex = 0;

    const result: boolean = component.isEnabled(type);
    expect(result).toEqual(false);
  });

  it('expects "isEnabled" to return true for next if pageIndex < total pages - 1', () => {
    const type = 'next';
    component.pageIndex = 8;
    component.totalPages = 10;

    const result: boolean = component.isEnabled(type);
    expect(result).toEqual(true);
  });

  it('expects "isEnabled" to return false for next if pageIndex is total pages - 1', () => {
    const type = 'next';
    component.pageIndex = 9;
    component.totalPages = 10;

    const result: boolean = component.isEnabled(type);
    expect(result).toEqual(false);
  });

  it('expects "isEnabled" to return true for last if pageIndex < total pages - 1', () => {
    const type = 'last';
    component.pageIndex = 8;
    component.totalPages = 10;

    const result: boolean = component.isEnabled(type);
    expect(result).toEqual(true);
  });

  it('expects "isEnabled" to return false for first if pageIndex is total pages - 1', () => {
    const type = 'last';
    component.pageIndex = 9;
    component.totalPages = 10;

    const result: boolean = component.isEnabled(type);
    expect(result).toEqual(false);
  });

  it('expects "isEnabled" to handle incorrect type', () => {
    const type = 'not-in-list';

    const result: boolean = component.isEnabled(type);
    expect(result).toEqual(false);
  });
});
