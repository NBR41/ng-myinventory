import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, ActivationGuard, AdminGuard } from './_guards/index';

import { HomeComponent } from './home/home.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: UserCreateComponent },
  { path: 'forgottenpassword', component: ForgottenPasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  /*
  { path: 'validate', component: UserValidateComponent },
  { path: 'login', component: LoginComponent },/
  { path: 'definepassword', component: DefinePasswordComponent }
  { path: 'needactivation', component: NeedActivatonComponent, canActivate: [AuthGuard]  }
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, ActivationGuard] }
  { path: 'user', component: UserDetailComponent, canActivate: [AuthGuard, ActivationGuard] }
  { path: 'book', component: BookDetailComponent, canActivate: [AuthGuard, ActivationGuard] }
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, ActivationGuard, AdminGuard]  }
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard, ActivationGuard, AdminGuard] }
  */
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
