import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  private flags: any = {
    longTermGoals: false,
    companyTracking: false,
    interviewResearch: false,
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
