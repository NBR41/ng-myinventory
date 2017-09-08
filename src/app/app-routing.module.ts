import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { AuthGuard, ActivationGuard, AdminGuard, LoggedGuard } from './_guards/index';

import { PageNotFoundComponent } from './not-found.component';
import { HomeComponent } from './home/home.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserNeedValidateComponent } from './user-validate/user-needvalidate.component';
import { UserValidateComponent } from './user-validate/user-validate.component';
import { ForgottenPasswordComponent } from './reset-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BookDetailResolver } from './books/book-detail-resolver.service';
import { BookDetailComponent } from './books/book-detail.component';
import { BookListComponent } from './books/book-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'signup', component: UserCreateComponent, canActivate: [LoggedGuard] },
  { path: 'password/forgotten', component: ForgottenPasswordComponent, canActivate: [LoggedGuard] },
  { path: 'password/reset', component: ResetPasswordComponent, canActivate: [LoggedGuard] },
  { path: 'login', component: UserLoginComponent, canActivate: [LoggedGuard] },
  { path: 'user/validate', component: UserValidateComponent },
  { path: 'user/needactivation', component: UserNeedValidateComponent, canActivate: [AuthGuard] },
  { path: 'books/:id', component: BookDetailComponent, resolve: { book: BookDetailResolver}, canActivate: [AuthGuard, AdminGuard] },
  { path: 'books', component: BookListComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, ActivationGuard] },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }

  /*
  { path: 'definepassword', component: DefinePasswordComponent }
  { path: 'user', component: UserDetailComponent, canActivate: [AuthGuard, ActivationGuard] }
  { path: 'book', component: BookDetailComponent, canActivate: [AuthGuard, ActivationGuard] }
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard, ActivationGuard, AdminGuard]  }
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard, ActivationGuard, AdminGuard] }
  */
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, /*{enableTracing: true}*/) ],
  providers: [
      BookDetailResolver,
      AuthGuard, ActivationGuard, AdminGuard, LoggedGuard ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
