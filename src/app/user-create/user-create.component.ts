import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { UserService } from '../_services/user.service';
import { AlertService } from '../alerts/alert.service';

import { User } from '../_models/user'

@Component({
    selector: 'dialog-created-account',
    templateUrl: 'dialog.html'
})
export class CreatedAccountDialog {
}

@Component({
    moduleId: module.id,
    selector: 'user-create',
    templateUrl: 'user-create.component.html'
})

export class UserCreateComponent {
  model: any = {}
  loading = false;

  constructor(
      private router: Router,
      private alertService: AlertService,
      private userService: UserService,
      private dialog: MdDialog) { }

  create(email: string, nickname: string, password: string): void {
      this.loading = true;
      this.userService.create(email, nickname, password).then(() => {
          this.loading = false;
          this.openDialog()
      }).catch(error => {
          this.loading = false;
          console.log(error)
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
      let dialogref = this.dialog.open(CreatedAccountDialog, {disableClose: true, panelClass: "custom-dialog"});
      dialogref.afterClosed().subscribe(() => this.router.navigate(['/login']));
  }
}
