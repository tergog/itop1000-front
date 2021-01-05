import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ClientEffects } from './effects';
import { reducer } from './reducer';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('client', reducer),
    EffectsModule.forFeature([ClientEffects])],
  exports: [],
})
export class ClientModule {}
