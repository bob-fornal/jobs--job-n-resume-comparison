import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { AboutPledgeComponent } from './pages/about-pledge/about-pledge.component';
import { CompareResumeComponent } from './pages/compare-resume/compare-resume.component';
import { CompanyTrackingComponent } from './pages/company-tracking/company-tracking.component';
import { DaysOfCodeComponent } from './pages/days-of-code/days-of-code.component';
import { InterviewResearchComponent } from './pages/interview-research/interview-research.component';
import { JobApplicationsComponent } from './pages/job-applications/job-applications.component';
import { LongTermGoalsComponent } from './pages/long-term-goals/long-term-goals.component';
import { HowToUseComponent } from './pages/how-to-use/how-to-use.component';
import { Top10ConnectionsComponent } from './pages/top-10-connections/top-10-connections.component';

import { DocumentationCompareResumeComponent } from './shared/menu-page-level/documentation-compare-resume/documentation-compare-resume.component';
import { DocumentationDaysOfCodeComponent } from './shared/menu-page-level/documentation-days-of-code/documentation-days-of-code.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'company-tracking', component: CompanyTrackingComponent },
  { path: 'days-of-code', component: DaysOfCodeComponent },
  { path: 'how-to-use', component: HowToUseComponent },
  { path: 'interviewing-research', component: InterviewResearchComponent },
  { path: 'job-applications', component: JobApplicationsComponent },
  { path: 'long-term-goals', component: LongTermGoalsComponent },
  { path: 'pledge', component: AboutPledgeComponent },
  { path: 'resumes', component: CompareResumeComponent },
  { path: 'top-10-connections', component: Top10ConnectionsComponent },

  { path: 'documentation/resumes', component: DocumentationCompareResumeComponent },
  { path: 'documentation/days-of-code', component: DocumentationDaysOfCodeComponent },

  { path: '', redirectTo: '/resumes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
