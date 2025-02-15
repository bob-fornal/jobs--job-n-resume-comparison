import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { CompareResumeComponent } from './pages/compare-resume/compare-resume.component';
import { CompanyTrackingComponent } from './pages/company-tracking/company-tracking.component';
import { DaysOfCodeComponent } from './pages/days-of-code/days-of-code.component';
import { InterviewResearchComponent } from './pages/interview-research/interview-research.component';
import { LongTermGoalsComponent } from './pages/long-term-goals/long-term-goals.component';
import { HowToUseComponent } from './pages/how-to-use/how-to-use.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'company-tracking', component: CompanyTrackingComponent },
  { path: 'days-of-code', component: DaysOfCodeComponent },
  { path: 'how-to-use', component: HowToUseComponent },
  { path: 'interviewing-research', component: InterviewResearchComponent },
  { path: 'long-term-goals', component: LongTermGoalsComponent },
  { path: 'resumes', component: CompareResumeComponent },

  { path: '', redirectTo: '/resumes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
