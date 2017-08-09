import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { GravatarModule } from 'ng2-gravatar-directive';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent} from './home.component';
import { UserLoginComponent} from './user-login.component';
import { LoggedUserComponent } from './logged-user.component';
import { UserCreateComponent } from './user-create.component';
import { ForgottenPasswordComponent } from './forgotten-password.component';
import { ResetPasswordComponent } from './reset-password.component';

import { BookService } from './book.service';
import { UserService } from './user.service';
import { OwnershipService } from './ownership.service';
import { AuthenticationService } from './authentication.service';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        GravatarModule
    ],
  declarations: [
    AppComponent, HomeComponent, UserLoginComponent, LoggedUserComponent,
    UserCreateComponent, ForgottenPasswordComponent, ResetPasswordComponent
  ],

  providers: [
      BookService,
      UserService,
      OwnershipService,
      AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
