import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatPaginatorModule } from '@angular/material/paginator';

import { PagesSharedModule } from 'app/inner-pages/shared/pages-shared.module';
import { ProjectApplicationsComponent } from './project-applications.component';

export const routes: Routes = [
  { path: '', component: ProjectApplicationsComponent },
];

@NgModule({
  declarations: [ProjectApplicationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveComponentModule,
    PagesSharedModule,
    MatPaginatorModule,
  ]
})
export class ProjectApplicationsModule { }
