/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export type BaseClassInitial = string | boolean | number;

export type BaseClassArrayAny = Array<any>;

export interface BaseClassObjectArray {
  [key: string]: BaseClassArrayAny;
};

export type BaseClassValues = BaseClassInitial | BaseClassArrayAny | BaseClassObjectArray;

export interface BaseClassStructure {
  key: string;
  type: string;
  initialValue: BaseClassValues;
  minimumLength?: number;
}

export interface UnwrappedObject {
  [key: string]: BaseClassValues;
};