import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ChatEffects } from './chat.effects';
import { reducer } from './chat.reducer';
import { metaReducers } from 'app/core/developers/store';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('chat', reducer, { metaReducers }),
    EffectsModule.forFeature([ ChatEffects ])],
  exports: [],
})
export class ChatModule {}
