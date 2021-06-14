import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProjectApplicationsComponent } from './project-applications.component';
import { ReactiveComponentModule } from "@ngrx/component";
import { PagesSharedModule } from "../../shared/pages-shared.module";
import { MatPaginatorModule } from "@angular/material/paginator";

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
