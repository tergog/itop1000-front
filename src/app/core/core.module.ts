import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CoreEffects } from 'app/core/effects/core.effects';
import { NotificationComponent } from './components/notification/notification.component';
import { TermsPagesComponent } from './components/terms-pages/terms-pages.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    NotificationComponent,
    TermsPagesComponent,
  ],
  imports: [CommonModule, RouterModule, EffectsModule.forRoot([CoreEffects])],
  exports: [NotificationComponent, TermsPagesComponent],
})
export class CoreModule {}
