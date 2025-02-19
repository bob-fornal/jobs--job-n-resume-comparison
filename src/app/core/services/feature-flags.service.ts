import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FEATURES } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  
  private features: string | undefined = FEATURES;
  private enabledFeatureFlags = (): Array<string> => JSON.parse(this.features || '[]');

  private flags: any = {
    howToUse: false,
    longTermGoals: false,
    companyTracking: false,
    interviewingResearch: false,
    top10Connections: false,
  };

  constructor(
    private route: ActivatedRoute,
  ) {
    this.init();
  }

  init = (): void => {
    this.enabledFeatureFlags().forEach((flag: string) => {
      this.flags[flag] = true;
    });
  };

  private hasUrlParam = (param: string): boolean => {
    return this.route.snapshot.params.hasOwnProperty(param);
  };

  showFeature = (feature: string): boolean => {
    return this.flags[feature] || this.hasUrlParam(feature);
  };
}
