import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { FeatureFlagsService } from './feature-flags.service';
import { of } from 'rxjs';

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

describe('FeatureFlagsService', () => {
  let service: FeatureFlagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    });
    service = TestBed.inject(FeatureFlagsService);
  });

  beforeEach(() => {
    (globalThis as any).import = {
      meta: {
        env: {
          NG_APP_ENABLED_FEATURES: '[]',
        }
      }
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "hasUrlParam" to return false if param does not exist', () => {
    const param: string = 'PARAM';
    service['route'].snapshot.params = {};

    const result: boolean = service['hasUrlParam'](param);
    expect(result).toEqual(false);
  });

  it('expects "hasUrlParam" to return true if param does exist', () => {
    const param: string = 'PARAM';
    service['route'].snapshot.params = {
      [param]: 'true'
    };

    const result: boolean = service['hasUrlParam'](param);
    expect(result).toEqual(true);
  });

  it('expects "showFeature" to return true if feature flag state is true', () => {
    service['flags'].test = true;
    spyOn((service as any), 'hasUrlParam').and.returnValue(false);

    const result: boolean = service.showFeature('test');
    expect(result).toEqual(true);
  });

  it('expects "showFeature" to return true if has url param is true', () => {
    service['flags'].test = false;
    spyOn((service as any), 'hasUrlParam').and.returnValue(true);

    const result: boolean = service.showFeature('test');
    expect(result).toEqual(true);
  });

  it('expects "showFeature" to return false if flag and param are false', () => {
    service['flags'].test = false;
    spyOn((service as any), 'hasUrlParam').and.returnValue(false);

    const result: boolean = service.showFeature('test');
    expect(result).toEqual(false);
  });
});