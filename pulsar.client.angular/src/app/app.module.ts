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
import { ChannelPageComponent } from './pages/channel-page/channel-page.component';
import { ChatComponent } from './components/chat/chat.component';
import { StreamPlayerComponent } from './components/stream/stream-player/stream-player.component';
import { StreamDescriptionComponent } from './components/stream/stream-description/stream-description.component';
import { ChatFormsComponent } from './components/chat/chat-forms/chat-forms.component';
import { StreamPreviewComponent } from './components/stream-preview/stream-preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { MatDividerModule } from '@angular/material/divider';
import { FinishStreamModalComponent } from './components/stream/finish-stream-modal/finish-stream-modal.component';
import { SavedStreamPageComponent } from './pages/saved-stream-page/saved-stream-page.component';
@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        AuthenticationComponent,
        NavBarComponent,
        SignupComponent,
        ErrorPageComponent,
        VerifyEmailMessageComponent,
        StreamComponent,
        ModalComponent,
        StreamInitComponent,
        ChannelPageComponent,
        ChatComponent,
        StreamPlayerComponent,
        StreamDescriptionComponent,
        ChatFormsComponent,
        StreamPreviewComponent,
        ConfirmEmailComponent,
        FinishStreamModalComponent,
        SavedStreamPageComponent,
    ],
    imports: [
        MatDividerModule,
        ClipboardModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        StoreModule.forRoot(fromApp.appReducer),
        StoreDevtoolsModule.instrument({}),
        // StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([AuthenticationEffects]),
        BrowserAnimationsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
