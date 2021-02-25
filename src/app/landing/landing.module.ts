import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from 'app/landing/landing.component';
import { LandingTitleComponent } from 'app/landing/shared/landing-title/landing-title.component';
import { SharedModule } from 'app/shared/shared.module';
import { LandingSeparatorComponent } from 'app/landing/shared/landing-separator/landing-separator.component';
import { LandingBenefitsComponent } from 'app/landing/shared/landing-benefits/landing-benefits.component';
import { LandingGuideComponent } from 'app/landing/shared/landing-guide/landing-guide.component';
import { LandingTopComponent } from 'app/landing/shared/landing-top/landing-top.component';
import { LandingClientComponent } from 'app/landing/landing-client/landing-client.component';
import { LandingFreelancerComponent } from 'app/landing/landing-freelancer/landing-freelancer.component';
import { LandingProjectsComponent } from 'app/landing/shared/landing-projects/landing-projects.component';
import { LandingDescriptionComponent } from 'app/landing/shared/landing-description/landing-description.component';

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
    LandingTitleComponent,
    LandingSeparatorComponent,
    LandingBenefitsComponent,
    LandingGuideComponent,
    LandingTopComponent,
    LandingProjectsComponent,
    LandingDescriptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class LandingModule { }
