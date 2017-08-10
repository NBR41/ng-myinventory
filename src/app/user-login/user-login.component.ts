import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'user-login',
    templateUrl: 'user-login.component.html'
})

export class UserLoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit(): void {
        // reset login status
        this.authenticationService.logout();
    }

    login(): void {
        this.loading = true;
        this.authenticationService.login(this.model.login, this.model.password)
            .then(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/dashboard']);
                } else {
                    // login failed
                    this.error = 'Login or password is incorrect';
                    this.loading = false;
                }
            });
    }

    gotoCreate(): void {
        this.router.navigate(['/signup'])
    }

    gotoForgottenPassword(): void {
        this.router.navigate(['/forgottenpassword'])
    }
}
