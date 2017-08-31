import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

// redirect to need activation if user is not activated
@Injectable()
export class ActivationGuard implements CanActivate {

    constructor(
        private router: Router,
        private authservice: AuthenticationService,
    ) { }

    canActivate() {
        if (this.authservice.user && this.authservice.user.is_validated) {
            return true;
        }

        this.router.navigate(['/user/needactivation']);
        return false;
    }
}
