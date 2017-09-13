import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../alerts/alert.service';
import { DialogService } from '../dialog/dialog.service';
import { ValidationService } from '../_services/validation.service';

@Component({
    moduleId: module.id,
    selector: 'user-needvalidate',
    templateUrl: 'user-needvalidate.component.html'
})
export class UserNeedValidateComponent {

    constructor(
        protected router: Router,
        protected authService: AuthenticationService,
        protected alertService: AlertService,
        protected dialogService: DialogService,
        protected validationService: ValidationService
    ) {
    }

    sendValidationMail(email: string): void {
        this.validationService.sendValidationLink(this.authService.user.id, this.authService.token).then(result => {
            // login successful
            this.dialogService.success(
                "User Validation link was sent",
                "A mail has been sent to you. Please click the link inside to validate your account.",
                '/home'
            )
        }).catch(error => {
            switch (error) {
                case "BadRequest":
                    this.alertService.warn("Your request is not valid");
                    return null;
                case "Unauthorized":
                    this.router.navigate(['/login']);
                case "NotFound":
                    this.router.navigate(['/login']);
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
}
