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
import { metaReducers, reducers } from 'app/core/reducers';
import { environment } from 'environments/environment';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { CoreModule } from 'app/core/core.module';
import { DevelopersModule } from 'app/core/developers/developers.module';
import { HttpErrorHandlerService } from 'app/shared/services/http-error-handler.service';
import { TokenInterceptor } from 'app/shared/interceptors/token.interceptor';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { EntityStoreModule } from 'app/core/entity/entity-store.module'
import { entityConfig } from 'app/core/entity/entity.metadata';
import { HeaderComponent } from './inner-pages/components/header/header.component';
import { FooterComponent } from './inner-pages/components/footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { InputComponent } from './shared/components/input/input.component';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl
}

@NgModule({
  declarations: [AppComponent, LandingComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    DevelopersModule,
    EntityStoreModule,
    BrowserAnimationsModule,
    NgxStripeModule.forRoot('pk_test_51HfRHCEuY58zLN527L8buA0YyVEdwwmwCiPgRNRiMhWdDdXaKgYOYeQ6bDNwDPXMtaAmtSSnbpaSzYYceAl7bSwh00wB02HoJj'),
    StoreModule.forRoot({}),
    EntityDataModule.forRoot(entityConfig),
    EffectsModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    GooglePlaceModule
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
    { 
      provide: DefaultDataServiceConfig,
      useValue: defaultDataServiceConfig
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
