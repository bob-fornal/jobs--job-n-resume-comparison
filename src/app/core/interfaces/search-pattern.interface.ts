export interface SearchPattern {
  index: number;
  title: string;
  baseUrl: string;
  fixedParams: string;
  dynamicParams: Array<string>;
  frequencyOfUse: number;
  datetimestamp: string;
}