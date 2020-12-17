import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InnerPagesComponent } from 'app/inner-pages/inner-pages.component';
import { SharedModule } from 'app/shared/shared.module';
import { DevPagesGuard } from 'app/shared/guards/dev-pages.guard';
import { ClientPagesGuard } from 'app/shared/guards/client-pages.guard';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {
    path: 'd',
    canActivate: [DevPagesGuard],
    component: InnerPagesComponent,
    loadChildren: () =>
      import('app/inner-pages/dev-pages/dev-pages.module').then((m) => m.DevPagesModule),
  },
  {
    path: 'c',
    canActivate: [ClientPagesGuard],
    component: InnerPagesComponent,
    loadChildren: () =>
      import('app/inner-pages/client-pages/client-pages.module').then(
        (m) => m.ClientPagesModule
      ),
  }
];

@NgModule({
  declarations: [InnerPagesComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InnerPagesModule {}
