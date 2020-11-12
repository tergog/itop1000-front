import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LandingPageComponent } from 'app/core/components/landing-page/landing-page.component';
import { CoreEffects } from 'app/core/effects/core.effects';
import { NotificationComponent } from 'app/core/components/notification/notification.component';
import { TermsPagesComponent } from 'app/core/components/terms-pages/terms-pages.component';

import { reducer } from './reducers/core.reducer';
import { metaReducers } from './reducers';


@NgModule({
  declarations: [
    LandingPageComponent,
    NotificationComponent,
    TermsPagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('core', reducer, {metaReducers}),
    EffectsModule.forFeature([CoreEffects])],
  exports: [NotificationComponent, TermsPagesComponent],
})
export class CoreModule {}
