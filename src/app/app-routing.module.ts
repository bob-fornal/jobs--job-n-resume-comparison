import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { CompareResumeComponent } from './pages/compare-resume/compare-resume.component';
import { DaysOfCodeComponent } from './pages/days-of-code/days-of-code.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'days-of-code', component: DaysOfCodeComponent },
  { path: 'resumes', component: CompareResumeComponent },

  { path: '', redirectTo: '/resumes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
