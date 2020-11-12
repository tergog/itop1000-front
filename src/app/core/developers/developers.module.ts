import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DevelopersEffects } from './developers.effects';
import { reducer } from './developers.reducer';
import { metaReducers } from 'app/core/developers';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('developers', reducer, {metaReducers}),
    EffectsModule.forFeature([DevelopersEffects])],
  exports: [],
})
export class DevelopersModule {}
