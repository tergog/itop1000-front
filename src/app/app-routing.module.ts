import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from 'app/core/components/landing-page/landing-page.component';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { ClientPagesGuard } from 'app/shared/guards/client-pages.guard';
import { VerifyEmailComponent } from 'app/auth/components/verify-email/verify-email.component';
import { TermsPagesComponent } from 'app/core/components/terms-pages/terms-pages.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
