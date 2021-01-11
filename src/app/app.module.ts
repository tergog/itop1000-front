import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxStripeModule } from 'ngx-stripe';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { metaReducers, reducers } from 'app/core/reducers/index';
import { environment } from 'environments/environment';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { CoreModule } from 'app/core/core.module';
import { DevelopersModule } from 'app/core/developers/store/developers.module';
import { HttpErrorHandlerService } from 'app/shared/services/http-error-handler.service';
import { TokenInterceptor } from 'app/shared/interceptors/token.interceptor';
import { ClientModule } from './core/client/store/client.module';
import { ChatModule } from './core/chats/store/chat.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    DevelopersModule,
    ClientModule,
    BrowserAnimationsModule,
    NgxStripeModule.forRoot('pk_test_51HfRHCEuY58zLN527L8buA0YyVEdwwmwCiPgRNRiMhWdDdXaKgYOYeQ6bDNwDPXMtaAmtSSnbpaSzYYceAl7bSwh00wB02HoJj'),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    GooglePlaceModule,
    ChatModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
