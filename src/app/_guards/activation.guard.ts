import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class ActivationGuard implements CanActivate {

    constructor(
        private router: Router,
        private authservice: AuthenticationService,
    ) { }

    canActivate() {
        if (this.authservice.user && this.authservice.user.is_verified) {
            // verified so return true
            return true;
        }

        this.router.navigate(['/user/needactivation']);
        return false;
    }
}
