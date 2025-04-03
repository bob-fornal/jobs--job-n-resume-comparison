import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JAViewTrackingComponent } from './ja-view-tracking.component';

const mockActivatedRoute: any = {
  paramMap: of({ get: (key: string) => 'mockValue' }),
  queryParamMap: of({ get: (key: string) => 'mockQueryValue' }),
  snapshot: {
    params: {},
    paramMap: { get: (key: string) => 'mockSnapshotValue' },
    queryParamMap: { get: (key: string) => 'mockSnapshotQueryValue' },
  },
  data: of({ key: 'mockData' })
};

import { MatIconModule } from '@angular/material/icon';

describe('JAViewTrackingComponent', () => {
  let component: JAViewTrackingComponent;
  let fixture: ComponentFixture<JAViewTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
      ],
      declarations: [
        JAViewTrackingComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(JAViewTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
