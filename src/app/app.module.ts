import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { MdDialogModule } from '@angular/material';

import { GravatarModule } from 'ng2-gravatar-directive';
import { AppRoutingModule } from './app-routing.module';
import { AlertModule,  } from './alerts/alert.module';
import { AlertService } from './alerts/alert.service'

import { AppComponent } from './app.component';
import { HomeComponent} from './home/home.component';
import { UserLoginComponent} from './user-login/user-login.component';
import { LoggedUserComponent } from './logged-user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { ForgottenPasswordComponent, ForgottenPasswordDialog } from './forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { BookService,UserService,OwnershipService,AuthenticationService, PasswordService } from './_services/index';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        GravatarModule,
        MdDialogModule,
        AppRoutingModule,
        AlertModule
    ],
  declarations: [
    AppComponent, HomeComponent, UserLoginComponent, LoggedUserComponent,
    UserCreateComponent, ForgottenPasswordComponent, ForgottenPasswordDialog, ResetPasswordComponent
  ],

  providers: [
      AuthenticationService,
      AlertService,
      BookService,
      UserService,
      OwnershipService,
      PasswordService,
  ],

  entryComponents: [
    ForgottenPasswordDialog
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
