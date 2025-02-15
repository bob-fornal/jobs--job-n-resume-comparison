import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AboutComponent } from './pages/about/about.component';
import { CompareResumeComponent } from './pages/compare-resume/compare-resume.component';
import { DaysOfCodeComponent } from './pages/days-of-code/days-of-code.component';
import { ModalGoalComponent } from './shared/modal-goal/modal-goal.component';
import { ItemImageComponent } from './shared/item-image/item-image.component';
import { ModalDayComponent } from './shared/modal-day/modal-day.component';
import { ModalIgnoreListComponent } from './shared/modal-ignore-list/modal-ignore-list.component';
import { TopToolbarComponent } from './shared/top-toolbar/top-toolbar.component';
import { LongTermGoalsComponent } from './pages/long-term-goals/long-term-goals.component';
import { CompanyTrackingComponent } from './pages/company-tracking/company-tracking.component';
import { InterviewResearchComponent } from './pages/interview-research/interview-research.component';
import { HowToUseComponent } from './pages/how-to-use/how-to-use.component';
import { ApplicationMenuComponent } from './shared/application-menu/application-menu.component';

@NgModule({
  declarations: [
    AppComponent,

    AboutComponent,
    CompareResumeComponent,
    DaysOfCodeComponent,
    ItemImageComponent,
    ModalDayComponent,
    ModalGoalComponent,
    ModalIgnoreListComponent,
    TopToolbarComponent,
    LongTermGoalsComponent,
    CompanyTrackingComponent,
    InterviewResearchComponent,
    HowToUseComponent,
    ApplicationMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
