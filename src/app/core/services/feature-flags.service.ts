import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  private flags: any = {
    howToUse: true,
    longTermGoals: true,
    companyTracking: true,
    interviewingResearch: true,
    top10Connections: true,
  };

  constructor(
    private route: ActivatedRoute,
  ) { }

  private hasUrlParam = (param: string): boolean => {
    return this.route.snapshot.params.hasOwnProperty(param);
  };

  showFeature = (feature: string): boolean => {
    return this.flags[feature] || this.hasUrlParam(feature);
  };
}
