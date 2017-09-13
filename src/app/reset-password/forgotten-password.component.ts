import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alerts/alert.service';
import { DialogService } from '../dialog/dialog.service';
import { PasswordService } from '../_services/password.service';

@Component({
    moduleId: module.id,
    selector: 'forgotten-password',
    templateUrl: 'forgotten-password.component.html'
})
export class ForgottenPasswordComponent {

    email: string;
    loading = false;

    constructor(
        private router: Router,
        private alertService: AlertService,
        private dialogService: DialogService,
        private passwordService: PasswordService,
    ) { }

    sendResetLink(email: string): void {
        this.loading = true;
        this.passwordService.sendResetLink(this.email).then(result => {
            this.loading = false;
            this.dialogService.success(
                "Password reset link was sent",
                "A mail has been sent to you. Please click the link inside to reset your password.",
                "/home"
            )
        }).catch(error => {
            this.loading = false;
            switch (error) {
                case "BadRequest":
                    this.alertService.warn("Your email is not valid");
                    return null;
                case "UnprocessableEntity":
                    this.alertService.warn("Your email was not found");
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
}
