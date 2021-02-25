import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/shared/guards/auth.guard';
import { VerifyEmailComponent } from 'app/auth/components/verify-email/verify-email.component';
import { TermsPagesComponent } from 'app/core/components/terms-pages/terms-pages.component';

const routes: Routes = [
  { path: '',   redirectTo: '/landing/freelancer', pathMatch: 'full' },
  { path: 'account/verify-email', component: VerifyEmailComponent },
  {
    path: 'auth',
    loadChildren: () => import('app/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'in',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('app/inner-pages/inner-pages.module').then(
        (m) => m.InnerPagesModule
      ),
  },
  {
    path: 'terms',
    component: TermsPagesComponent,
  },
  {
    path: 'privacy',
    component: TermsPagesComponent,
  },
  {
    path: 'landing',
    loadChildren: () => import('app/landing/landing.module').then(
      (m) =>  m.LandingModule
    ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
