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
import { PagesSharedModule } from 'app/inner-pages/shared/pages-shared.module';
import { SharedModule } from 'app/shared/shared.module';
import { DevContactInfoEditComponent } from './dev-contact-info/dev-contact-info-edit/dev-contact-info-edit.component';
import { DevContactInfoPreviewComponent } from './dev-contact-info/dev-contact-info-preview/dev-contact-info-preview.component';
import { ReactiveFormsModule } from '@angular/forms';


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
    DevContactInfoPreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PagesSharedModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DevProfileModule { }
