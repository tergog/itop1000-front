import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SearchJobsComponent } from 'app/inner-pages/dev-pages/search-jobs/search-jobs.component';
import { JobFullComponent } from 'app/inner-pages/shared/components/job-full/job-full.component';
import { SharedModule } from 'app/shared/shared.module';
import { PagesSharedModule } from 'app/inner-pages/shared/pages-shared.module';

const routes: Routes = [
  { path: '', component: SearchJobsComponent },
  { path: ':id', component: JobFullComponent }
];

@NgModule({
  declarations: [SearchJobsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PagesSharedModule
  ]
})
export class SearchJobsModule { }
