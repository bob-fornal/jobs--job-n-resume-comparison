/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export type JoinItem = '-NONE-' | 'AND' | 'OR' | 'NOT';

export interface GroupItem {
  join: JoinItem;
  option: string;
}

export interface Base {
  title: string;
  url: string;
  baseParams: string;
}

export interface Groups {
  groups: Array<string>;
  groupParams: {
    [key: string]: Array<GroupItem>;
  };
}

export type PatternObject = Base & Groups;
