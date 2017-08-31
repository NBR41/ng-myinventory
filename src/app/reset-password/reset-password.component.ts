import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordService } from '../_services/password.service';
import { AlertService } from '../alerts/alert.service';
import { DialogService } from '../dialog/dialog.service';

@Component({
    moduleId: module.id,
    selector: 'reset-password',
    templateUrl: 'reset-password.component.html'
})
export class ResetPasswordComponent  implements OnInit {

    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        protected route: ActivatedRoute,
        private alertService: AlertService,
        private dialogService: DialogService,
        private passwordService: PasswordService,
    ) { }

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.model.token = params.t
      })
    }

    gotoForgotten(): void {
        this.router.navigate(['/password/forgotten'])
    }

    resetPassword(): void {
      this.loading = true;
      this.passwordService.resetPassword(this.model.password, this.model.token).then(result => {
          this.loading = false;
          this.dialogService.success(
              "Your Password is updated",
              "Your password has been successfully updated.",
              "/login"
          )
      }).catch(error => {
          this.loading = false;
          switch (error) {

          }
      })
    }
}
