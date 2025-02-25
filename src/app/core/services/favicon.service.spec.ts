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
    const url = 'https://localhost:3000/';
    const expected = 'localhost';

    const result: string = service['getEnvironment'](url);
    expect(result).toEqual(expected);
  });

  it('expects "getEnvironment" to return dev', () => {
    const url = 'https://dev.job-squid.com/';
    const expected = 'dev';

    const result: string = service['getEnvironment'](url);
    expect(result).toEqual(expected);
  });

  it('expects "getEnvironment" to return dev', () => {
    const url = 'https://pre-prod.job-squid.com/';
    const expected = 'pre-prod';

    const result: string = service['getEnvironment'](url);
    expect(result).toEqual(expected);
  });

  it('expects "getEnvironment" to return dev', () => {
    const url = 'https://job-squid.com/';
    const expected = 'production';

    const result: string = service['getEnvironment'](url);
    expect(result).toEqual(expected);
  });
});
