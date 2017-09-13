import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService }  from '../_services/user.service';
import { User }  from '../_models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserDetailResolver implements Resolve<User> {

  constructor(
      private router: Router,
      private us: UserService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    let id = route.paramMap.get('id');
    return this.us.getUser(+id).take(1).map(user => {
      if (user) {
        return user;
      } else { // id not found
        this.router.navigate(['/users']);
        return [];
      }
  }).catch(error => {
      this.router.navigate(['/users']);
      return [];
  })
  }
}
