import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'profile', loadChildren: () => import('app/inner-pages/dev-pages/dev-profile/dev-profile.module').then(m => m.DevProfileModule) },
  { path: 'search-jobs', loadChildren: () => import('app/inner-pages/dev-pages/search-jobs/search-jobs.module').then(m => m.SearchJobsModule) },
  { path: 'chat', loadChildren: () => import('app/inner-pages/shared/pages-shared.module').then(m => m.PagesSharedModule) }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DevPagesModule { }
