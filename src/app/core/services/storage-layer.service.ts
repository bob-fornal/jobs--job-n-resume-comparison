import { Injectable } from '@angular/core';

import DataStore from '@blakewatson/datastore';

type ReturnType = any | undefined;
type DataType = any | null;

@Injectable({
  providedIn: 'root'
})
export class StorageLayerService {
  
  private localstorage: any = window.localStorage;

  private dataStore: any = DataStore;
  private database: { name: string, storesToCreate: Array<string>, version?: number } = {
    name: 'job-squid',
    storesToCreate: [
      'company-tracker',
      'days-of-code',
      'emergency-contacts',
      'event-tracker',
      'interview-research',
      'long-term-goals',
      'network-tracker',
      'resumes',
    ],
    version: 2,
};

  constructor() {
    this.init();
  }

  private init = async (): Promise<void> => {
    this.dataStore.setupDb(this.database);
  };

  public getItem = async (storeKey: string, itemKey: string, useDB = true): Promise<DataType> => {
    if (useDB === false) {
      const itemString: string | null = this.localstorage.getItem(itemKey);
      return itemString === null ? null : JSON.parse(itemString);
    }

    const store: any = new this.dataStore(this.database.name, storeKey);
    const item: ReturnType = await store.getItem(itemKey);
    return item || null;
  };

  public setItem = async (storeKey: string, itemKey: string, itemData: any, useDB = true): Promise<void> => {
    if (useDB === false) {
      const itemDataString = JSON.stringify(itemData);
      this.localstorage.setItem(itemKey, itemDataString);
      return;
    }

    const store: any = new this.dataStore(this.database.name, storeKey);
    await store.setItem(itemKey, itemData);
  };

  public removeItem = async (storeKey: string, itemKey: string, useDB = true): Promise<void> => {
    if (useDB === false) {
      this.localstorage.removeItem(itemKey);
      return;
    }

    const store: any = new this.dataStore(this.database.name, storeKey);
    await store.removeItem(itemKey);
  };
}
