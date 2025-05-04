/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable no-prototype-builtins */
import { inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  BaseClassArrayAny,
  BaseClassObjectArray,
  BaseClassStructure,
  BaseClassValues,
  UnwrappedObject,
} from '../interfaces/base-class.interface';

export abstract class BaseClass {
  readonly fb = inject(FormBuilder);

  private _fg: FormGroup;
  private _structure: Array<BaseClassStructure>;
  private _types: { [key: string]: string } = {};

  public get formGroup(): FormGroup {
    return this._fg;
  }
  public set data(data: FormGroup) {
    this._fg = data;
  }

  constructor(structure: Array<BaseClassStructure>) {
    this._structure = structure;
    this._fg = this.initializeStructure();
  }

  initializeStructure(): FormGroup {
    const fg: any = {};
    this._structure.forEach((structure: BaseClassStructure) => {
      this._types[structure.key] = structure.type;
      switch (structure.type) {
        case 'string': {
          if (structure.hasOwnProperty('minimumLength') === false) {
            fg[structure.key] = new FormControl<string>(structure.initialValue as string);
          } else {
            fg[structure.key] = new FormControl<string>(structure.initialValue as string, [Validators.minLength(structure.minimumLength!)]);
          }
          break;
        }
        case 'boolean':
          fg[structure.key] = new FormControl<boolean>(structure.initialValue as boolean);
          break;
        case 'number':
          fg[structure.key] = new FormControl<number>(structure.initialValue as number);
          break;
        case 'array':
          fg[structure.key] = this.fb.array(structure.initialValue as Array<any>);
          break;
        case 'object:array': {
          const objectArrayGroup: any = {};
          const keys: Array<string> = Object.keys(structure.initialValue as BaseClassObjectArray);
          keys.forEach((key: string) => {
            const value: BaseClassArrayAny = (structure.initialValue as BaseClassObjectArray)[key];
            objectArrayGroup[key] = this.fb.array(value);
          });
          fg[structure.key] = this.fb.group(objectArrayGroup);
          break;
        }
      }
    });
    return this.fb.group(fg);
  }

  patchStructure(data: any): void {
    const patch: UnwrappedObject = {};
    const initialTypes = ['string', 'boolean', 'number'];

    Object.keys(data).forEach((key: string) => {
      const type: string = this._types[key];
      switch (true) {
        case initialTypes.includes(type) === true:
          patch[key] = data[key];
          break;
        case type === 'array': {
          data[key].forEach((item: any) => {
            const formArray: FormArray<any> = data.get(key) as FormArray;
            if (!formArray.invalid) {
              formArray.push(this.fb.group(item));
            }
          });
          break;
        }
        case type === 'object:array': {
          const keys: Array<string> = Object.keys(data[key]);
          keys.forEach((groupKey: string) => {
            data[key].forEach((item: any) => {
              const formArray: FormArray<any> = data[key].get(groupKey) as FormArray;
              if (!formArray.invalid) {
                formArray.push(this.fb.group(item));
              }  
            });
          });
          break;
        }
      }
    });

    data.patchValue(patch);
    this._fg = data;
  }

  exportObject(): UnwrappedObject {
    const data: { [key: string]: BaseClassValues } = {};
    const initialTypes = ['string', 'boolean', 'number', 'array'];

    this._structure.forEach((structure: BaseClassStructure) => {
      if (initialTypes.includes(structure.type) === true) {
        data[structure.key] = this._fg.get(structure.key)!.value;
      } else {
        data[structure.key] = {};
        const group: any = this._fg.get(structure.key)!.value;
        const keys = Object.keys(group);
        keys.forEach((key: string) => {
          const value: BaseClassArrayAny = group.get(key)!.value;
          (data[structure.key] as BaseClassObjectArray)[key] = value;
        });
      }
    });
    return data;
  }

  toString(): string {
    const data: UnwrappedObject = this.exportObject();
    return JSON.stringify(data);
  }
}