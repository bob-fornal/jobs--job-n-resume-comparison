import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  
  enabledFeatureFlags: Array<string> = JSON.parse(import.meta.env.NG_APP_ENABLED_FEATURES || '[]');

  private flags: any = {
    howToUse: false,
    longTermGoals: true,
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
    this.enabledFeatureFlags.forEach((flag: string) => {
      this.flags[flag] = true;
    });
  };

  private hasUrlParam = (param: string): boolean => {
    // eslint-disable-next-line no-prototype-builtins
    return this.route.snapshot.params.hasOwnProperty(param);
  };

  showFeature = (feature: string): boolean => {
    return this.flags[feature] || this.hasUrlParam(feature);
  };
}
