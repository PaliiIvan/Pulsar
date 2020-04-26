import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LogInComponent } from './components/authentication/login/login.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AuthenticationEffects } from './components/authentication/_store/authentication.effects';
import { HttpErrorInterceptor } from './utils/interceptors/http-error.interceptor';

import * as fromApp from './store/app.reducer';

import { VerifyEmailMessageComponent } from './components/authentication/email-verification/email-verification.component';
import { StreamComponent } from './components/stream/stream.component';
import { ModalComponent } from './components-UI/modal/modal.component';
import { AuthInterceptor } from './utils/interceptors/authentication.interceptor';
import { StreamInitComponent } from './components/stream/stream-init/stream-init.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LogInComponent,
    AuthenticationComponent,
    NavBarComponent,
    SignupComponent,
    ErrorPageComponent,
    VerifyEmailMessageComponent,
    StreamComponent,
    ModalComponent,
    StreamInitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({}),
   // StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([LogInEffects, AuthenticationEffects, SignUpEffects, EmailVerificationEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
