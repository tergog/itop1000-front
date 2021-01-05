import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { NgxStripeModule } from 'ngx-stripe';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveComponentModule } from '@ngrx/component';

import { ChangePasswordDialogComponent } from 'app/inner-pages/shared/components//change-password-dialog/change-password-dialog.component';
import {
  ProfileChangePasswordComponent
} from 'app/inner-pages/shared/components/profile-change-password/profile-change-password.component';
import { ProfileSectionHeaderComponent } from 'app/inner-pages/shared/components/profile-section-header/profile-section-header.component';
import { SharedModule } from 'app/shared/shared.module';
import { JobComponent } from 'app/inner-pages/shared/components/job/job.component';
import { UploadPhotoDialogComponent } from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import { DeveloperResumeComponent } from 'app/inner-pages/shared/components/developer-resume/developer-resume.component';
import { DeveloperResumeFullComponent } from 'app/inner-pages/shared/components/developer-resume-full/developer-resume-full.component';
import { StandardBgWrapComponent } from 'app/inner-pages/shared/components/standard-bg-wrap/standard-bg-wrap.component';
import { AddBillingMethodDialogComponent } from 'app/inner-pages/shared/components/add-billing-method-dialog/add-billing-method-dialog.component';
import { UpdateBillingMethodDialogComponent } from 'app/inner-pages/shared/components/update-billing-method-dialog/update-billing-method-dialog.component';
import { JobFullComponent } from './components/job-full/job-full.component';
import { WorkExperienceComponent } from './components/developer-resume-full/work-experience/work-experience.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DeleteBillingMethodDialogComponent } from 'app/inner-pages/shared/components/delete-billing-method-dialog/delete-billing-method-dialog.component';
import { ConfirmationDialogComponent } from 'app/inner-pages/shared/components/confirmation-dialog/confirmation-dialog.component';
import { EditJobDialogComponent } from 'app/inner-pages/shared/components/edit-job-dialog/edit-job-dialog.component';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { LandingComponent } from 'app/landing/landing.component';
import { HeaderLandingComponent } from 'app/inner-pages/components/header-landing/header-landing.component';
import { FooterLandingComponent } from 'app/inner-pages/components/footer-landing/footer-landing.component';
import { RouterModule } from '@angular/router';
import { GetPaidNowDialogComponent } from './components/get-paid-now-dialog/get-paid-now-dialog.component';
import { BankAccountDialogComponent } from './components/bank-account-dialog/bank-account-dialog.component';


@NgModule({
  declarations: [
    ChangePasswordDialogComponent,
    ProfileChangePasswordComponent,
    ProfileSectionHeaderComponent,
    GetPaidNowDialogComponent,
    JobComponent,
    UploadPhotoDialogComponent,
    DeveloperResumeComponent,
    DeveloperResumeFullComponent,
    StandardBgWrapComponent,
    AddBillingMethodDialogComponent,
    UpdateBillingMethodDialogComponent,
    JobFullComponent,
    WorkExperienceComponent,
    ProjectCardComponent,
    DeleteBillingMethodDialogComponent,
    ConfirmationDialogComponent,
    EditJobDialogComponent,
    LandingComponent,
    HeaderLandingComponent,
    FooterLandingComponent,
    BankAccountDialogComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    InViewportModule,
    NgxStripeModule,
    MatProgressSpinnerModule,
    ReactiveComponentModule,
    MatSelectModule
  ],
  exports: [
    ChangePasswordDialogComponent,
    ProfileChangePasswordComponent,
    ProfileSectionHeaderComponent,
    JobComponent,
    DeveloperResumeComponent,
    StandardBgWrapComponent,
    ProjectCardComponent
  ],
  providers: [
    DevProfileService
  ]
})
export class PagesSharedModule {
}
