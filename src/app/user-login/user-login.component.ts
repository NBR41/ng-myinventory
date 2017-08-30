import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../alerts/alert.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'user-login',
    templateUrl: 'user-login.component.html'
})

export class UserLoginComponent implements OnInit {
    model: any = {};
    loading = false;

    @Input() displayLinks: boolean = false;


    constructor(
        private router: Router,
        private alertService: AlertService,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit(): void {
        // reset login status
        this.authenticationService.logout();
    }

    login(): void {
        this.loading = true;
        this.authenticationService.login(this.model.login, this.model.password)
            .then(result => {
              this.loading = false;
              this.router.navigate(['/dashboard']);
            })
          .catch(error => {
                this.loading = false;
                switch (error) {
                    case "BadRequest":
                        this.alertService.warn("Your request is not valid");
                        return null;
                    case "UnprocessableEntity":
                        this.alertService.warn("Your login/password doesn't match");
                        return null;
                    case "InternalServerError":
                        this.alertService.error("Your request encountered an unexpected error.");
                        return null;
                    case "ServiceUnavailable":
                        this.alertService.error("Our service is momentarily unavailable.");
                        return null;
                    default:
                        this.alertService.error("Our service is momentarily unavailable.");
                        return null;
                }
            })
    }

    gotoCreate(): void {
        this.router.navigate(['/signup'])
    }

    gotoForgottenPassword(): void {
        this.router.navigate(['/password/forgotten'])
    }
}
