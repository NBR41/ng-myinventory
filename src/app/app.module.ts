import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent} from './home.component';
import { LoginComponent} from './login.component';


import { BookService } from './book.service';
import { UserService } from './user.service';
import { OwnershipService } from './ownership.service';
import { AuthenticationService } from './authentication.service';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(), 
        AppRoutingModule
    ],
  declarations: [
    AppComponent, HomeComponent, LoginComponent
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
