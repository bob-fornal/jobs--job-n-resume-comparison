import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { CompareResumeComponent } from './pages/compare-resume/compare-resume.component';
import { CompanyTrackingComponent } from './pages/company-tracking/company-tracking.component';
import { DaysOfCodeComponent } from './pages/days-of-code/days-of-code.component';
import { InterviewResearchComponent } from './pages/interview-research/interview-research.component';

import { LongTermGoalsComponent } from './pages/long-term-goals/long-term-goals.component';
import { AddEditLtgComponent } from './pages/long-term-goals/add-edit-ltg/add-edit-ltg.component';

import { HowToUseComponent } from './pages/how-to-use/how-to-use.component';
import { Top10ConnectionsComponent } from './pages/top-10-connections/top-10-connections.component';

import { DocumentationCompareResumeComponent } from './shared/menu-page-level/documentation-compare-resume/documentation-compare-resume.component';
import { DocumentationDaysOfCodeComponent } from './shared/menu-page-level/documentation-days-of-code/documentation-days-of-code.component';
import { DocumentationLongTermGoalsComponent } from './shared/menu-page-level/documentation-long-term-goals/documentation-long-term-goals.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'company-tracking', component: CompanyTrackingComponent },
  { path: 'days-of-code', component: DaysOfCodeComponent },
  { path: 'how-to-use', component: HowToUseComponent },
  { path: 'interviewing-research', component: InterviewResearchComponent },

  { path: 'long-term-goals', component: LongTermGoalsComponent },
  { path: 'long-term-goals/:type', component: AddEditLtgComponent },
  { path: 'long-term-goals/:type/:index', component: AddEditLtgComponent },

  { path: 'resumes', component: CompareResumeComponent },
  { path: 'top-10-connections', component: Top10ConnectionsComponent },

  { path: 'documentation/days-of-code', component: DocumentationDaysOfCodeComponent },
  { path: 'documentation/long-term-goals', component: DocumentationLongTermGoalsComponent },
  { path: 'documentation/resumes', component: DocumentationCompareResumeComponent },
  
  { path: '', redirectTo: '/resumes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
