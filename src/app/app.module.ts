import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgxStripeModule } from 'ngx-stripe';

import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { environment } from 'environments/environment';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { CoreModule } from 'app/core/core.module';
import { DevelopersModule } from 'app/core/developers/store/developers.module';
import { HttpErrorHandlerService } from 'app/shared/services/http-error-handler.service';
import { TokenInterceptor } from 'app/shared/interceptors/token.interceptor';
import { ClientModule } from './core/client/store/client.module';
import { SharedModule } from './shared/shared.module';
import { ProjectApplicationsModule } from './inner-pages/client-pages/project-applications/project-applications.module';


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
    SharedModule,
    ProjectApplicationsModule,
    EffectsModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ReactiveComponentModule
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
