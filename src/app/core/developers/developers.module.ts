import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DevelopersEffects } from './developers.effects';
import { reducer } from './developers.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('developers', reducer),
    EffectsModule.forRoot([DevelopersEffects])],
  exports: [],
})
export class DevelopersModule {}
