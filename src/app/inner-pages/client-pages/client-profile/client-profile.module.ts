import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ClientProfileComponent } from 'app/inner-pages/client-pages/client-profile/client-profile.component';
import { ClientProfileSidenavComponent } from 'app/inner-pages/client-pages/client-profile/client-profile-sidenav/client-profile-sidenav.component';
import { ClientProfileSectionsComponent } from 'app/inner-pages/client-pages/client-profile/client-profile-sections/client-profile-sections.component';
import { JobFullComponent } from 'app/inner-pages/shared/components/job-full/job-full.component';
import { PagesSharedModule } from 'app/inner-pages/shared/pages-shared.module';
import { ClientContactInfoComponent } from 'app/inner-pages/client-pages/client-profile/client-contact-info/client-contact-info.component';
import { SharedModule } from 'app/shared/shared.module';
import { ClientPostedJobsComponent } from 'app/inner-pages/client-pages/client-profile/client-posted-jobs/client-posted-jobs.component';
import { CreateJobComponent } from 'app/inner-pages/client-pages/client-profile/client-posted-jobs/create-job/create-job.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientPaymentsComponent } from 'app/inner-pages/client-pages/client-profile/client-payments/client-payments.component';
import { ClientBillingsComponent } from 'app/inner-pages/client-pages/client-profile/client-billings/client-billings.component';
import { BillingMethodComponent } from 'app/inner-pages/client-pages/client-profile/client-billings/billing-method/billing-method.component';
import { ClientContactInfoPreviewComponent } from 'app/inner-pages/client-pages/client-profile/client-contact-info/client-contact-info-preview/client-contact-info-preview.component';
import { ClientContactInfoEditComponent } from 'app/inner-pages/client-pages/client-profile/client-contact-info/client-contact-info-edit/client-contact-info-edit.component';
import { ClientContactInfoLocationEditComponent } from 'app/inner-pages/client-pages/client-profile/client-contact-info/client-contact-info-location-edit/client-contact-info-location-edit.component';
import { ClientContactInfoLocationPreviewComponent } from 'app/inner-pages/client-pages/client-profile/client-contact-info/client-contact-info-location-preview/client-contact-info-location-preview.component';
import { MatSelectModule } from '@angular/material/select'


export const routes: Routes = [
  { path: '', component: ClientProfileComponent },
  { path: 'job/:id', component: JobFullComponent}
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
    ClientBillingsComponent,
    BillingMethodComponent,
    ClientContactInfoPreviewComponent,
    ClientContactInfoEditComponent,
    ClientContactInfoLocationEditComponent,
    ClientContactInfoLocationPreviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PagesSharedModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule
  ]
})
export class ClientProfileModule { }
