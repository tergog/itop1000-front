import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ReactiveFormsModule} from '@angular/forms';
import {InViewportModule} from '@thisissoon/angular-inviewport';

import {ChangePasswordDialogComponent} from 'app/inner-pages/shared/components//change-password-dialog/change-password-dialog.component';
import {
  ProfileChangePasswordComponent
} from 'app/inner-pages/shared/components/profile-change-password/profile-change-password.component';
import {ProfileSectionHeaderComponent} from 'app/inner-pages/shared/components/profile-section-header/profile-section-header.component';
import {SharedModule} from 'app/shared/shared.module';
import {JobComponent} from 'app/inner-pages/shared/components/job/job.component';
import {UploadPhotoDialogComponent} from 'app/inner-pages/shared/components/upload-photo-dialog/upload-photo-dialog.component';
import {DeveloperResumeComponent} from 'app/inner-pages/shared/components/developer-resume/developer-resume.component';
import {DeveloperResumeFullComponent} from 'app/inner-pages/shared/components/developer-resume-full/developer-resume-full.component';
import {StandardBgWrapComponent} from 'app/inner-pages/shared/components/standard-bg-wrap/standard-bg-wrap.component';
import {JobFullComponent} from './components/job-full/job-full.component';
import {WorkExperienceComponent} from './components/developer-resume-full/work-experience/work-experience.component';
import {ProjectCardComponent} from './components/project-card/project-card.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ChatComponent} from './components/chat/chat.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: ChatComponent},
];

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
    JobFullComponent,
    WorkExperienceComponent,
    ProjectCardComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ImageCropperModule,
    InViewportModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
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
})
export class PagesSharedModule {
}
