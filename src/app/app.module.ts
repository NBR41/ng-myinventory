import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';


import { GravatarModule } from 'ng2-gravatar-directive';
import { AppRoutingModule } from './app-routing.module';
import { AlertModule,  } from './alerts/alert.module';
import { AlertService } from './alerts/alert.service'
import { DialogModule  } from './dialog/dialog.module';
import { DialogService } from './dialog/dialog.service'

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import { HomeComponent} from './home/home.component';
import { UserLoginComponent} from './user-login/user-login.component';
import { UserNeedValidateComponent } from './user-validate/user-needvalidate.component';
import { UserValidateComponent } from './user-validate/user-validate.component';
import { ForgottenPasswordComponent } from './reset-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { BookDetailComponent } from './books/book-detail.component';
import { BookListComponent } from './books/book-list.component';

import { UserCreateComponent } from './users/user-create.component';
import { UserDetailComponent } from './users/user-detail.component';
import { UserListComponent } from './users/user-list.component';

import { DashboardComponent } from './dashboard/dashboard.component';


import {
    BookService,
    UserService,
    OwnershipService,
    AuthenticationService,
    PasswordService,
    ValidationService
} from './_services/index';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        GravatarModule,
        AlertModule,
        DialogModule,
        AppRoutingModule,
    ],
  declarations: [
    AppComponent, PageNotFoundComponent, HomeComponent,
    UserLoginComponent, UserNeedValidateComponent, UserValidateComponent,
    ForgottenPasswordComponent, ResetPasswordComponent,
    UserCreateComponent, UserDetailComponent, UserListComponent,
    BookDetailComponent, BookListComponent,
    DashboardComponent
  ],

  providers: [
      AlertService, DialogService,
      AuthenticationService, BookService, UserService, OwnershipService, PasswordService, ValidationService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
