import { Injectable } from '@angular/core';

import DataStore from '@blakewatson/datastore';

type ReturnType = any | undefined;
type DataType = any | null;

@Injectable({
  providedIn: 'root'
})
export class StorageLayerService {
  
  localstorage: any = window.localStorage;

  dataStore: any = DataStore;
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

  private init = (): void => {
    this.dataStore.setupDb(this.database);
  };

  public getItem = async (storeKey: string, itemKey: string, useDB: boolean = true): Promise<DataType> => {
    if (useDB === false) {
      const itemString: string | null = this.localstorage.getItem(itemKey);
      return itemString === null ? null : JSON.parse(itemString);
    }

    const store: any = new this.dataStore(this.database.name, storeKey);
    const item: ReturnType = await store.getItem(itemKey);
    return item || null;
  };

  public setItem = async (storeKey: string, itemKey: string, itemData: any, useDB: boolean = true): Promise<void> => {
    if (useDB === false) {
      const itemDataString = JSON.stringify(itemData);
      this.localstorage.setItem(itemKey, itemDataString);
      return;
    }

    const store: any = new this.dataStore(this.database.name, storeKey);
    await store.setItem(itemKey, itemData);
  };

  public removeItem = async (storeKey: string, itemKey: string, useDB: boolean = true): Promise<void> => {
    if (useDB === false) {
      this.localstorage.removeItem(itemKey);
      return;
    }

    const store: any = new this.dataStore(this.database.name, storeKey);
    await store.removeItem(itemKey);
  };
}
