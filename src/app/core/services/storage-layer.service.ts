import { Injectable } from '@angular/core';

import DataStore from '@blakewatson/datastore';

type DataType = string | null;

@Injectable({
  providedIn: 'root'
})
export class StorageLayerService {
  
  database: { name: string, storesToCreate: Array<string> } = {
    name: 'job-squid',
    storesToCreate: [
      'days-of-code',
      'resumes',
    ],
  };

  constructor() {
    this.init();
  }

  init = (): void => {
    DataStore.setupDb(this.database);
  };

  public getItem = async (storeKey: string, itemKey: string): Promise<DataType> => {
    const store: any = new DataStore(this.database.name, storeKey);
    const item: string | null = await store.getItem(itemKey);
    return item;
  };

  public setItem = async (storeKey: string, itemKey: string, itemData: string): Promise<void> => {
    const store: any = new DataStore(this.database.name, storeKey);
    await store.setItem(itemKey, itemData);
  };

  public removeItem = async (storeKey: string, itemKey: string): Promise<void> => {
    const store: any = new DataStore(this.database.name, storeKey);
    await store.removeItem(itemKey);
  };
}
