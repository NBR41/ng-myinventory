import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { PasswordService } from '../_services/password.service';
import { AlertService } from '../alerts/alert.service';

@Component({
    selector: 'dialog-forgotten-password',
    templateUrl: 'dialog.html'
})
export class ForgottenPasswordDialog {
}


@Component({
    moduleId: module.id,
    selector: 'forgotten-password',
    templateUrl: 'forgotten-password.component.html'
})

export class ForgottenPasswordComponent {

    email: string;
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private alertService: AlertService,
        private passwordService: PasswordService,
        private dialog: MdDialog) { }


    sendResetLink(): void {
        this.loading = true;
        this.passwordService.sendResetLink(this.email).then(result => {
            this.loading = false;
            if (result === true) {
                // login successful
                this.openDialog()
            } else {
                // login failed
                this.error = 'Not known Email';
            }
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

    openDialog() {
        let dialogref = this.dialog.open(ForgottenPasswordDialog, {disableClose: true, panelClass: "custom-dialog"});
        dialogref.afterClosed().subscribe(() => this.router.navigate(['/home']));
    }
}
