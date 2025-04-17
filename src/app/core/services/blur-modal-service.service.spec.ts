import { TestBed } from '@angular/core/testing';

import { BlurModalService } from './blur-modal-service.service';

import { MatDialog } from '@angular/material/dialog';

import { MockModalComponent } from '../../shared/_specs/components/mock-modal-component.spec';

describe('BlurModalService', () => {
  let service: BlurModalService;
  let mockMatDialog: jasmine.SpyObj<MatDialog>

  beforeEach(() => {
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
      ]
    });
    service = TestBed.inject(BlurModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger blur event', () => {
    const element = document.createElement('input');
    document.body.appendChild(element);
    element.focus();

    service.open(MockModalComponent, {});
    expect(document.activeElement).not.toEqual(element);
  });
});
