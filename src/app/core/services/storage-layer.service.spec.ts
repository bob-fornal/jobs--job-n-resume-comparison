import { TestBed } from '@angular/core/testing';

import { StorageLayerService } from './storage-layer.service';

let mockResult: any;
class MockDataStore {
  name = '';
  store = '';

  constructor(name: string, store: string) {
    this.name = name;
    this.store = store;
  }

  getItem = async (key: string): Promise<any> => {
    if (key === 'null') return null;
    return 'ITEM';
  };
  setItem = async (key: string, data: any): Promise<void> => {
    mockResult = {
      type: 'setItem Fired',
      [key]: data,
    };
  };
  removeItem = async (key: string): Promise<void> => {
    mockResult = {
      type: 'removeItem Fired',
    };
  };
}

const MockLocalStorage = {
  getItem: (key: string): any => ({}),
  setItem: (key: string, data: any): any => ({}),
  removeItem: (key: string): any => ({}),
};

describe('StorageLayerService', () => {
  let service: StorageLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageLayerService);

    service['localstorage'] = MockLocalStorage;
    service['dataStore'] = MockDataStore;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "init" to trigger DB setup', () => {
    service['dataStore'] = {
      setupDb: (dbConfig: any) => ({}),
    };
    spyOn(service['dataStore'], 'setupDb').and.stub();

    service['init']();
    expect(service['dataStore'].setupDb).toHaveBeenCalled();
  });

  it('expects "getItem" to retrieve null via localstorage', async () => {
    const storeKey = 'STORE';
    const itemKey = 'ITEM';
    const useDB = false;
    const expected: any = null;
    spyOn(service['localstorage'], 'getItem').and.returnValue(expected);

    const result: any = await service.getItem(storeKey, itemKey, useDB);
    expect(result).toEqual(expected);
  });

  it('expects "getItem" to retrieve content via localstorage', async () => {
    const storeKey = 'STORE';
    const itemKey = 'ITEM';
    const useDB = false;
    const expected: any = 'RESULT';
    const expectedString: string = JSON.stringify(expected);
    spyOn(service['localstorage'], 'getItem').and.returnValue(expectedString);

    const result: any = await service.getItem(storeKey, itemKey, useDB);
    expect(result).toEqual(expected);
  });

  it('expects "getItem" to retrieve null via database', async () => {
    const storeKey = 'STORE';
    const itemKey = 'null';
    const expected: any = null;
    
    const result: any = await service.getItem(storeKey, itemKey);
    expect(result).toEqual(expected);
  });

  it('expects "getItem" to retrieve item via database', async () => {
    const storeKey = 'STORE';
    const itemKey = 'ITEM';
    const expected: any = 'ITEM';
    
    const result: any = await service.getItem(storeKey, itemKey);
    expect(result).toEqual(expected);
  });

  it('expects "setItem" to set item to localstorage as a string', async () => {
    const storeKey = 'STORE';
    const itemKey = 'ITEM';
    const useDB = false;
    const itemData: any = { item: 'DATA' };
    const itemDataString: string = JSON.stringify(itemData);
    spyOn(service['localstorage'], 'setItem').and.stub();

    await service.setItem(storeKey, itemKey, itemData, useDB);
    expect(service['localstorage'].setItem).toHaveBeenCalledWith(itemKey, itemDataString);
  });

  it('expects "setItem" to set item to database', async () => {
    const storeKey = 'STORE';
    const itemKey = 'ITEM';
    const itemData: any = { item: 'DATA' };
    const expected: any = {
      type: 'setItem Fired',
      [itemKey]: itemData,
    };
    mockResult = null;

    await service.setItem(storeKey, itemKey, itemData);
    expect(mockResult).toEqual(expected);
  });

  it('expects "removeItem" to remove item from localstorage', async () => {
    const storeKey = 'STORE';
    const itemKey = 'ITEM';
    const useDB = false;
    spyOn(service['localstorage'], 'removeItem').and.stub();

    await service.removeItem(storeKey, itemKey, useDB);
    expect(service['localstorage'].removeItem).toHaveBeenCalledWith(itemKey);
  });

  it('expects "removeItem" to set item to database', async () => {
    const storeKey = 'STORE';
    const itemKey = 'ITEM';
    const expected: any = {
      type: 'removeItem Fired',
    };
    mockResult = null;

    await service.removeItem(storeKey, itemKey);
    expect(mockResult).toEqual(expected);
  });
});
