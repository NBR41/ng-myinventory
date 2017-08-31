import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

// redirect to login page if not logged
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authservice: AuthenticationService,
    ) { }

    canActivate() {
        if (this.authservice.user) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
