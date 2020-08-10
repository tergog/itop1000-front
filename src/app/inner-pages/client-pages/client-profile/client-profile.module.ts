import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ClientProfileComponent } from './client-profile.component';
import { ClientProfileSidenavComponent } from './client-profile-sidenav/client-profile-sidenav.component';
import { ClientProfileSectionsComponent } from './client-profile-sections/client-profile-sections.component';
import { PagesSharedModule } from 'app/inner-pages/shared/pages-shared.module';
import { ClientContactInfoComponent } from './client-contact-info/client-contact-info.component';
import { SharedModule } from 'app/shared/shared.module';
import { ClientPostedJobsComponent } from 'app/inner-pages/client-pages/client-profile/client-posted-jobs/client-posted-jobs.component';
import { CreateJobComponent } from './client-posted-jobs/create-job/create-job.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientPaymentsComponent } from './client-payments/client-payments.component';
import { ClientBillingsComponent } from './client-billings/client-billings.component';

export const routes: Routes = [
  { path: '', component: ClientProfileComponent }
];

@NgModule({
  declarations: [
    ClientProfileComponent,
    ClientProfileSidenavComponent,
    ClientProfileSectionsComponent,
    ClientContactInfoComponent,
    ClientPostedJobsComponent,
    CreateJobComponent,
    ClientPaymentsComponent,
    ClientBillingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PagesSharedModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClientProfileModule { }
