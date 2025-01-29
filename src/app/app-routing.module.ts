import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareResumeComponent } from './pages/compare-resume/compare-resume.component';

const routes: Routes = [
  { path: 'comparison', component: CompareResumeComponent },
  { path: '', redirectTo: '/comparison', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
