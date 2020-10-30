import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule } from '@angular/forms';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { NgxStripeModule } from 'ngx-stripe';

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
import { AddBillingMethodDialogComponent } from './components/add-billing-method-dialog/add-billing-method-dialog.component';

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
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ImageCropperModule,
    InViewportModule,
    NgxStripeModule,
  ],
  exports: [
    ChangePasswordDialogComponent,
    ProfileChangePasswordComponent,
    ProfileSectionHeaderComponent,
    JobComponent,
    DeveloperResumeComponent,
    StandardBgWrapComponent,
  ],
})
export class PagesSharedModule {}
