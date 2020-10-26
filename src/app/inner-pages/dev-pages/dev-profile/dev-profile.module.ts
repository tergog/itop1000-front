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
import { DevContactInfoAccountPreviewComponent } from './dev-contact-info/dev-contact-info-account-preview/dev-contact-info-account-preview.component';
import { DevContactInfoLocationPreviewComponent } from './dev-contact-info/dev-contact-info-location-preview/dev-contact-info-location-preview.component';
import { DevContactInfoLocationEditComponent } from './dev-contact-info/dev-contact-info-location-edit/dev-contact-info-location-edit.component';
import { DevContactInfoAccountEditComponent } from './dev-contact-info/dev-contact-info-account-edit/dev-contact-info-account-edit.component';


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
    DevContactInfoAccountPreviewComponent,
    DevContactInfoLocationPreviewComponent,
    DevContactInfoLocationEditComponent,
    DevContactInfoAccountEditComponent
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
