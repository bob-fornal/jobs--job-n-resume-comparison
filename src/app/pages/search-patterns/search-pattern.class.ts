/* eslint-disable no-prototype-builtins */
import { BaseClassStructure, UnwrappedObject } from "../../core/interfaces/base-class.interface";
import {
  Base,
  GroupItem,
  JoinItem,
  PatternObject
} from "./search-pattern.interface";

import { BaseClass } from "../../core/classes/base-class.abstract";

const STRUCTURE: Array<BaseClassStructure> = [
  { key: 'title', type: 'string', initialValue: '', minimumLength: 3 },
  { key: 'url', type: 'string', initialValue: '', minimumLength: 3 },
  { key: 'baseParams', type: 'string', initialValue: '', minimumLength: 3 },
  { key: 'groups', type: 'array', initialValue: ['-NONE-'] },
  { key: 'groupPrams', type: 'object:array', initialValue: {
    '-NONE-': [{ join: '-NONE-', option: '' }]
  }},
];

export class SearchPatternClass extends BaseClass {

  constructor() {
    super(STRUCTURE);
  }

  public toStringTitle(): string {
    return this.data.get('title')?.value || '';
  }

  public toStringUrl(): string {
    const url: string = this.data.get('url')?.value || '';
    const baseParams: string = this.data.get('baseParams')?.value || '';
    return url + baseParams;
  }

  public updateData(data: PatternObject): void {
    this.patchStructure(data);
  }

  public addGroup(title: string): void {
    const structure: UnwrappedObject = this.exportObject();
    const groups = structure['groups'] as Array<string>;
    if (groups.includes(title) === true) return;
    
    groups.push(title);
    const groupParams = structure['groupsParams'] as any;
    groupParams[title] = [];
  }

  public updateGroup(title: string, params: Array<GroupItem>): void {
    this.data.groupParams[title] = params;
  }

  public deleteGroup(title: string): void {
    this.data.groups = this.data.groups.filter((group: string) => group !== title);
    delete this.data.groupParams[title];
  }

  public addGroupParam(key: string, item: GroupItem): void {
    this.data.groupParams[key].push(item);
  }

  public editGroupParam(key: string, item: GroupItem, index: number): void {
    this.data.groupParams[key][index] = item;
  }

  public deleteGroupParam(key: string, index: number): void {
    this.data.groupParams[key].splice(index, 1);
  }
}