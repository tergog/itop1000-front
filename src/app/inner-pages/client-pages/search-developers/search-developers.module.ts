import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PagesSharedModule } from 'app/inner-pages/shared/pages-shared.module';
import { SearchDevelopersComponent } from 'app/inner-pages/client-pages/search-developers/search-developers.component';
import { DeveloperResumeFullComponent } from 'app/inner-pages/shared/components/developer-resume-full/developer-resume-full.component';
import { WorkExperienceComponent } from 'app/inner-pages/shared/components/developer-resume-full/work-experience/work-experience.component';

const routes: Routes = [
  { path: ':id/project/:projectId', component: WorkExperienceComponent },
  { path: ':id', component: DeveloperResumeFullComponent },
  { path: '', component: SearchDevelopersComponent },
];

@NgModule({
  declarations: [SearchDevelopersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PagesSharedModule
  ]
})
export class SearchDevelopersModule { }
