import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MdDialog} from '@angular/material';
import { PasswordService } from '../_services/password.service';

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
        private passwordService: PasswordService,
        private dialog: MdDialog) { }


    sendResetLink(): void {
        this.openDialog()
        this.loading = true;
        this.passwordService.sendResetLink(this.email).then(result => {
            this.loading = false;
            if (result === true) {
                // login successful
                this.openDialog()
            } else {
                // login failed
                this.error = 'Not known Email';
                this.loading = false;
            }
        }).catch();
    }

    openDialog() {
        this.dialog.open(ForgottenPasswordDialog);
    }
}
