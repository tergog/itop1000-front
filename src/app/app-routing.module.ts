import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './core/components/landing-page/landing-page.component';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { ClientPagesGuard } from 'app/shared/guards/client-pages.guard';
import { VerifyEmailComponent } from './auth/components/verify-email/verify-email.component';
import { TermsPageComponent } from './info-pages/terms-page/terms-page.component';
import { PrivacyPageComponent } from './info-pages/privacy-page/privacy-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
  { path: 'account/verify-email', component: VerifyEmailComponent },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'in',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./inner-pages/inner-pages.module').then(
        (m) => m.InnerPagesModule
      ),
  },
  {
    path: 'terms',
    component: TermsPageComponent,
  },
  {
    path: 'privacy',
    component: PrivacyPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
