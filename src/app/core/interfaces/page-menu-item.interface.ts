export interface PageMenuItem {
  path: string;
  category: string;
  icon: string;
  title: string;
  featureFlag: boolean,
  featureName: string;
  dividerAfter: boolean;
  dividerBefore: boolean;
}