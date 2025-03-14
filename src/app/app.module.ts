import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AboutComponent } from './pages/about/about.component';
import { AboutPledgeComponent } from './pages/about-pledge/about-pledge.component';
import { CompanyTrackingComponent } from './pages/company-tracking/company-tracking.component';
import { CompareResumeComponent } from './pages/compare-resume/compare-resume.component';
import { DaysOfCodeComponent } from './pages/days-of-code/days-of-code.component';
import { InterviewResearchComponent } from './pages/interview-research/interview-research.component';
import { HowToUseComponent } from './pages/how-to-use/how-to-use.component';
import { ItemImageComponent } from './shared/item-image/item-image.component';
import { JobApplicationsComponent } from './pages/job-applications/job-applications.component';

import { LongTermGoalsComponent } from './pages/long-term-goals/long-term-goals.component';
import { AddEditLtgComponent } from './pages/long-term-goals/add-edit-ltg/add-edit-ltg.component';
import { LtgChecklistModalComponent } from './pages/long-term-goals/ltg-checklist-modal/ltg-checklist-modal.component';

import { MarketingPanelComponent } from './shared/marketing-panel/marketing-panel.component';
import { MenuApplicationComponent } from './shared/menu-application/menu-application.component';
import { MenuPageLevelComponent } from './shared/menu-page-level/menu-page-level.component';
import { ModalDayComponent } from './shared/modal-day/modal-day.component';
import { ModalGoalComponent } from './shared/modal-goal/modal-goal.component';
import { ModalIgnoreListComponent } from './shared/modal-ignore-list/modal-ignore-list.component';
import { Top10ConnectionsComponent } from './pages/top-10-connections/top-10-connections.component';
import { TopToolbarComponent } from './shared/top-toolbar/top-toolbar.component';

import { DocumentationCompareResumeComponent } from './shared/menu-page-level/documentation-compare-resume/documentation-compare-resume.component';
import { DocumentationDaysOfCodeComponent } from './shared/menu-page-level/documentation-days-of-code/documentation-days-of-code.component';
import { DocumentationLongTermGoalsComponent } from './shared/menu-page-level/documentation-long-term-goals/documentation-long-term-goals.component';

import { BlurModalService } from './core/services/blur-modal-service.service';
import { AddEditJobApplicationsComponent } from './pages/job-applications/add-edit-job-applications/add-edit-job-applications.component';

@NgModule({
  declarations: [
    AppComponent,

    AboutComponent,
    AboutPledgeComponent,

    CompanyTrackingComponent,
    CompareResumeComponent,

    DaysOfCodeComponent,
    DocumentationCompareResumeComponent,
    DocumentationDaysOfCodeComponent,
    DocumentationLongTermGoalsComponent,

    HowToUseComponent,

    InterviewResearchComponent,
    ItemImageComponent,

    JobApplicationsComponent,

    LongTermGoalsComponent,
    AddEditLtgComponent,
    LtgChecklistModalComponent,

    MarketingPanelComponent,
    MenuApplicationComponent,
    MenuPageLevelComponent,
    ModalDayComponent,
    ModalGoalComponent,
    ModalIgnoreListComponent,

    Top10ConnectionsComponent,
    TopToolbarComponent,
    AddEditJobApplicationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: MatDialog, useClass: BlurModalService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
