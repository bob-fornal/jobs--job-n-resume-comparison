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

import { ApplicationsAddEditComponent } from './pages/job-applications/applications-add-edit/applications-add-edit.component';
import { ApplicationsViewTrackingComponent } from './pages/job-applications/applications-view-tracking/applications-view-tracking.component';
import { AddEditLtgComponent } from './pages/long-term-goals/add-edit-ltg/add-edit-ltg.component';

import { SearchPatternsComponent } from './pages/search-patterns/search-patterns.component';
import { PatternsAddEditComponent } from './pages/search-patterns/patterns-add-edit/patterns-add-edit.component';

import { HowToUseComponent } from './pages/how-to-use/how-to-use.component';
import { Top10ConnectionsComponent } from './pages/top-10-connections/top-10-connections.component';

import { DocumentationCompareResumeComponent } from './shared/menu-page-level/documentation-compare-resume/documentation-compare-resume.component';
import { DocumentationDaysOfCodeComponent } from './shared/menu-page-level/documentation-days-of-code/documentation-days-of-code.component';
import { DocumentationJobApplicationsComponent } from './shared/menu-page-level/documentation-job-applications/documentation-job-applications.component';
import { DocumentationLongTermGoalsComponent } from './shared/menu-page-level/documentation-long-term-goals/documentation-long-term-goals.component';

import { TagManagementComponent } from './pages/tag-management/tag-management.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'company-tracking', component: CompanyTrackingComponent },
  { path: 'days-of-code', component: DaysOfCodeComponent },
  { path: 'how-to-use', component: HowToUseComponent },
  { path: 'interviewing-research', component: InterviewResearchComponent },

  { path: 'job-applications', component: JobApplicationsComponent },
  { path: 'job-applications/view-tracking/:index', component: ApplicationsViewTrackingComponent },
  { path: 'job-applications/:type', component: ApplicationsAddEditComponent },
  { path: 'job-applications/:type/:index', component: ApplicationsAddEditComponent },

  { path: 'long-term-goals', component: LongTermGoalsComponent },
  { path: 'long-term-goals/:type', component: AddEditLtgComponent },
  { path: 'long-term-goals/:type/:index', component: AddEditLtgComponent },

  { path: 'pledge', component: AboutPledgeComponent },
  { path: 'resumes', component: CompareResumeComponent },

  { path: 'search-patterns', component: SearchPatternsComponent },
  { path: 'search-patterns/:type', component: PatternsAddEditComponent },
  { path: 'search-patterns/:type/:index', component: PatternsAddEditComponent },

  { path: 'tag-management/:from', component: TagManagementComponent },
  { path: 'top-10-connections', component: Top10ConnectionsComponent },

  { path: 'documentation/days-of-code', component: DocumentationDaysOfCodeComponent },
  { path: 'documentation/job-applications', component: DocumentationJobApplicationsComponent },
  { path: 'documentation/long-term-goals', component: DocumentationLongTermGoalsComponent },
  { path: 'documentation/resumes', component: DocumentationCompareResumeComponent },
  
  { path: '', redirectTo: '/resumes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
