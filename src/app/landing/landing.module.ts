import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingClientComponent } from './landing-client/landing-client.component';
import { LandingFreelancerComponent } from './landing-freelancer/landing-freelancer.component';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from 'app/landing/landing.component';
import { LandingTitleComponent } from './shared/landing-title/landing-title.component';
import { SharedModule } from 'app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'freelancer',
        pathMatch: 'full'
      },
      {
        path: 'freelancer',
        component: LandingFreelancerComponent
      },
      {
        path: 'client',
        component: LandingClientComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    LandingClientComponent,
    LandingFreelancerComponent,
    LandingTitleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class LandingModule { }
