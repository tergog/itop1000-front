import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { DevContactInfoAccountPreviewComponent } from './dev-contact-info/dev-contact-info-account-preview/dev-contact-info-account-preview.component';
import { DevContactInfoLocationPreviewComponent } from './dev-contact-info/dev-contact-info-location-preview/dev-contact-info-location-preview.component';
import { DevContactInfoLocationEditComponent } from './dev-contact-info/dev-contact-info-location-edit/dev-contact-info-location-edit.component';
import { DevContactInfoAccountEditComponent } from './dev-contact-info/dev-contact-info-account-edit/dev-contact-info-account-edit.component';
import { DevWorkExperienceComponent } from './dev-work-experience/dev-work-experience.component';
import { DevProjectCardComponent } from './dev-work-experience/dev-project-card/dev-project-card.component';
import { DevProfileEditFormComponent } from './shared/dev-profile-edit-form/dev-profile-edit-form.component';
import { DevWantToLearnComponent } from './dev-want-to-learn/dev-want-to-learn.component';


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
    DevContactInfoAccountEditComponent,
    DevWorkExperienceComponent,
    DevProjectCardComponent,
    DevProfileEditFormComponent,
    DevWantToLearnComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PagesSharedModule,
    SharedModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    DevProfileService
  ],
})
export class DevProfileModule { }
