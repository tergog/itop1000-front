import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { NgxStripeModule } from 'ngx-stripe';
import { MatSelectModule } from '@angular/material/select';

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
import { DevProfileService } from '../dev-pages/dev-profile/dev-profile.service';


@NgModule({
  declarations: [
    ChangePasswordDialogComponent,
    ProfileChangePasswordComponent,
    ProfileSectionHeaderComponent,
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
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    InViewportModule,
    NgxStripeModule,
    MatProgressSpinnerModule,
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
