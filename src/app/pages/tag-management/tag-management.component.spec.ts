import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TagManagementComponent } from './tag-management.component';

import { MatIconModule } from '@angular/material/icon';

const mockActivatedRoute: any = {
  paramMap: of({ get: (key: string) => 'mockValue' }),
  queryParamMap: of({ get: (key: string) => 'mockQueryValue' }),
  snapshot: {
    params: {
      from: 'job-applications',
    },
    paramMap: { get: (key: string) => 'mockSnapshotValue' },
    queryParamMap: { get: (key: string) => 'mockSnapshotQueryValue' },
  },
  data: of({ key: 'mockData' })
};

import { MockTaggingService } from '../../shared/_specs/services/mock-tagging-service.spec';
import { TaggingService } from '../../core/services/tagging.service';

describe('TagManagementComponent', () => {
  let component: TagManagementComponent;
  let fixture: ComponentFixture<TagManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
      ],
      declarations: [
        TagManagementComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: TaggingService, useValue: MockTaggingService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagManagementComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
