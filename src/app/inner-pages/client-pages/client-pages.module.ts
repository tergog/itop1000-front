import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from 'app/inner-pages/client-pages/landing/landing.component';

export const routes: Routes = [
  { path: '', redirectTo: 'in/c/landing' },
  { path: 'profile', loadChildren: () => import('app/inner-pages/client-pages/client-profile/client-profile.module').then(m => m.ClientProfileModule) },
  { path: 'search-developers', loadChildren: () => import('app/inner-pages/client-pages/search-developers/search-developers.module').then(m => m.SearchDevelopersModule) },
  { path: 'chat', loadChildren: () => import('app/inner-pages/shared/components/chat/chat.module').then(m => m.ChatModule) },
  { path: 'landing', component: LandingComponent }
];

@NgModule({
  declarations: [ LandingComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ClientPagesModule { }
