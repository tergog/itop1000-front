import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DevProfileSectionsComponent } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-sections/dev-profile-sections.component';
import { ProfileSidenavComponent } from 'app/inner-pages/dev-pages/dev-profile/profile-sidenav/profile-sidenav.component';
import { DevProfileComponent } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.component';
import { DevContactInfoComponent } from 'app/inner-pages/dev-pages/dev-profile/dev-contact-info/dev-contact-info.component';
import { DevProfileSettingsComponent } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-settings/dev-profile-settings.component';
import { DevCategoriesAndSkillsComponent } from 'app/inner-pages/dev-pages/dev-profile/dev-categories-and-skills/dev-categories-and-skills.component';
import { DevProfileBalanceComponent } from 'app/inner-pages/dev-pages/dev-profile/dev-profile-balance/dev-profile-balance.component';
import { DevProfileService } from 'app/inner-pages/dev-pages/dev-profile/dev-profile.service';
import { PagesSharedModule } from 'app/inner-pages/shared/pages-shared.module';
import { SharedModule } from 'app/shared/shared.module';
import { DevContactInfoEditComponent } from 'app/inner-pages/dev-pages/dev-profile/dev-contact-info/dev-contact-info-edit/dev-contact-info-edit.component';
import { DevContactInfoPreviewComponent } from 'app/inner-pages/dev-pages/dev-profile/dev-contact-info/dev-contact-info-preview/dev-contact-info-preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DevWorkExperienceComponent } from './dev-work-experience/dev-work-experience.component';
import { DevProjectCardComponent } from './dev-work-experience/dev-project-card/dev-project-card.component';
import { EditFormComponent } from './shared/edit-form/edit-form.component';


const routes: Routes = [
  { path: '', component: DevProfileComponent }
];


@NgModule({
  declarations: [
    DevProfileComponent,
    ProfileSidenavComponent,
    DevContactInfoComponent,
    DevProfileSettingsComponent,
    DevCategoriesAndSkillsComponent,
    DevProfileBalanceComponent,
    DevProfileSectionsComponent,
    DevContactInfoEditComponent,
    DevContactInfoPreviewComponent,
    DevWorkExperienceComponent,
    DevProjectCardComponent,
    EditFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PagesSharedModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    DevProfileService
  ]
})
export class DevProfileModule { }
