import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from 'app/inner-pages/components/header/header.component';
import { FooterComponent } from 'app/inner-pages/components/footer/footer.component';
import { InnerPagesComponent } from './inner-pages.component';
import { SharedModule } from 'app/shared/shared.module';
import { DevPagesGuard } from 'app/shared/guards/dev-pages.guard';
import { ClientPagesGuard } from 'app/shared/guards/client-pages.guard';

const routes: Routes = [
  {
    path: 'd',
    canActivate: [DevPagesGuard],
    component: InnerPagesComponent,
    loadChildren: () =>
      import('./dev-pages/dev-pages.module').then((m) => m.DevPagesModule),
  },
  {
    path: 'c',
    canActivate: [ClientPagesGuard],
    component: InnerPagesComponent,
    loadChildren: () =>
      import('./client-pages/client-pages.module').then(
        (m) => m.ClientPagesModule
      ),
  },
];

@NgModule({
  declarations: [HeaderComponent, FooterComponent, InnerPagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InnerPagesModule {}