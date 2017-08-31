import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertService } from '../alerts/alert.service';
import { DialogService } from '../dialog/dialog.service';
import { User } from '../_models/user'

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
      private dialogService: DialogService,
      private userService: UserService,
  ) { }

  create(email: string, nickname: string, password: string): void {
      this.loading = true;
      this.userService.create(email, nickname, password).then(() => {
          this.loading = false;
          this.dialogService.success(
              "Your account is created",
              "Your account has been successfully created. An email has been sent to you, in order to finalize your subscription. Please click the link inside to validate your account.",
              "/login"
          )
      }).catch(error => {
          this.loading = false;
          switch (error) {
              case "BadRequest":
                  this.alertService.warn("Your request is not valid");
                  return null;
              case "DuplicateEmail":
                  this.alertService.warn("Your email is already used");
                  return null;
              case "DuplicateNickname":
                  this.alertService.warn("Your nickname is already used");
                  return null;
              case "UnprocessableEntity":
                  this.alertService.warn("Your email and your nickname are already used");
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
