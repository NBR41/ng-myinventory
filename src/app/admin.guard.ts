import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private router: Router,
        private authservice: AuthenticationService,
    ) { }

    canActivate() {
        if (this.authservice.user && this.authservice.user.is_admin) {
            // admin so return true
            return true;
        }

        // not logged in so redirect to home page
        this.router.navigate(['/home']);
        return false;
    }
}
