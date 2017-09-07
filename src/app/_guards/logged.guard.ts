import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

// redirect to dashboard page if logged user on non logged path
@Injectable()
export class LoggedGuard implements CanActivate {

    constructor(
        private router: Router,
        private authservice: AuthenticationService,
    ) { }

    canActivate() {
        console.log("guard LoggedGuard")
        if (!this.authservice.user) {
            return true;
        }

        this.router.navigate(['/dashboard']);
        return false;
    }
}
