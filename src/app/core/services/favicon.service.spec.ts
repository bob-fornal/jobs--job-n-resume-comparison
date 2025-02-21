import { TestBed } from '@angular/core/testing';

import { FaviconService } from './favicon.service';

describe('FaviconService', () => {
  let service: FaviconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaviconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "init" to use the element and url to set the favicon', () => {
    const element = {
      href: 'ORIGINAL',
    };
    const document = {
      querySelector: () => element,
    };
    service['document'] = document;
    service['location'] = {
      href: 'URL',
    };
    service['environments'].TEST = 'TEST.ico';
    spyOn((service as any), 'getEnvironment').and.returnValue('TEST');

    service.init();
    expect(element.href).toEqual('TEST.ico');
  });

  it('expects "getEnvironment" to return localhost', () => {
    const url: string = 'https://localhost:3000/';
    const expected: string = 'localhost';

    const result: string = service['getEnvironment'](url);
    expect(result).toEqual(expected);
  });

  it('expects "getEnvironment" to return dev', () => {
    const url: string = 'https://dev.job-squid.com/';
    const expected: string = 'dev';

    const result: string = service['getEnvironment'](url);
    expect(result).toEqual(expected);
  });

  it('expects "getEnvironment" to return dev', () => {
    const url: string = 'https://pre-prod.job-squid.com/';
    const expected: string = 'pre-prod';

    const result: string = service['getEnvironment'](url);
    expect(result).toEqual(expected);
  });

  it('expects "getEnvironment" to return dev', () => {
    const url: string = 'https://job-squid.com/';
    const expected: string = 'production';

    const result: string = service['getEnvironment'](url);
    expect(result).toEqual(expected);
  });
});
