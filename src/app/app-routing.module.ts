import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { ActivationGuard } from './activation.guard';
import { AdminGuard } from './admin.guard';

import { HomeComponent } from './home.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  /*
  { path: 'signup', component: UserCreateComponent },
  { path: 'validate', component: UserValidateComponent },
  { path: 'login', component: LoginComponent },/
  { path: 'resetpassword', component: ResetPasswordComponent },
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
