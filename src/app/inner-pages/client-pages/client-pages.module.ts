import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'in/c/profile' },
  { path: 'profile', loadChildren: () => import('app/inner-pages/client-pages/client-profile/client-profile.module').then(m => m.ClientProfileModule) },
  { path: 'search-developers', loadChildren: () => import('app/inner-pages/client-pages/search-developers/search-developers.module').then(m => m.SearchDevelopersModule) },
  { path: 'chat', loadChildren: () => import('app/inner-pages/shared/components/chat/chat.module').then(m => m.ChatModule) }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ClientPagesModule { }
