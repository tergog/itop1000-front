import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ClientProfileComponent } from 'app/inner-pages/client-pages/client-profile/client-profile.component';
import { ClientProfileSidenavComponent } from 'app/inner-pages/client-pages/client-profile/client-profile-sidenav/client-profile-sidenav.component';
import { ClientProfileSectionsComponent } from 'app/inner-pages/client-pages/client-profile/client-profile-sections/client-profile-sections.component';
import { PagesSharedModule } from 'app/inner-pages/shared/pages-shared.module';
import { ClientContactInfoComponent } from 'app/inner-pages/client-pages/client-profile/client-contact-info/client-contact-info.component';
import { SharedModule } from 'app/shared/shared.module';
import { ClientPostedJobsComponent } from 'app/inner-pages/client-pages/client-profile/client-posted-jobs/client-posted-jobs.component';
import { CreateJobComponent } from 'app/inner-pages/client-pages/client-profile/client-posted-jobs/create-job/create-job.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientPaymentsComponent } from 'app/inner-pages/client-pages/client-profile/client-payments/client-payments.component';
import { ClientBillingsComponent } from 'app/inner-pages/client-pages/client-profile/client-billings/client-billings.component';
import { BillingMethodComponent } from './client-billings/billing-method/billing-method.component';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";

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
    ClientBillingsComponent,
    BillingMethodComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PagesSharedModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class ClientProfileModule { }
