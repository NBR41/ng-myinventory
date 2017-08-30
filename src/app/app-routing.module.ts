import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, ActivationGuard, AdminGuard } from './_guards/index';

import { HomeComponent } from './home/home.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserNeedValidateComponent } from './user-validate/user-needvalidate.component';
import { UserValidateComponent } from './user-validate/user-validate.component';
import { ForgottenPasswordComponent } from './reset-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: UserCreateComponent },
  { path: 'password/forgotten', component: ForgottenPasswordComponent },
  { path: 'password/reset', component: ResetPasswordComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, ActivationGuard] },
  { path: 'user/needactivation', component: UserNeedValidateComponent, canActivate: [AuthGuard] },
  { path: 'user/validate', component: UserValidateComponent }
  /*
  { path: 'definepassword', component: DefinePasswordComponent }
  { path: 'user', component: UserDetailComponent, canActivate: [AuthGuard, ActivationGuard] }
  { path: 'book', component: BookDetailComponent, canActivate: [AuthGuard, ActivationGuard] }
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, ActivationGuard, AdminGuard]  }
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard, ActivationGuard, AdminGuard] }
  */
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  providers: [ AuthGuard, ActivationGuard, AdminGuard ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
