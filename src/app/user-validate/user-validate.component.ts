import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserNeedValidateComponent } from './user-needvalidate.component';
import { AuthenticationService } from '../_services/authentication.service';
import { ValidationService } from '../_services/validation.service';
import { AlertService } from '../alerts/alert.service';
import { DialogService } from '../dialog/dialog.service';

@Component({
    moduleId: module.id,
    selector: 'user-validate',
    templateUrl: 'user-validate.component.html'
})
export class UserValidateComponent extends UserNeedValidateComponent implements OnInit {

    private errorMsg: string;
    private displayRetry = false;

    constructor(
        protected router: Router,
        protected route: ActivatedRoute,
        protected alertService: AlertService,
        protected dialogService: DialogService,
        protected authService: AuthenticationService,
        protected validationService: ValidationService,
    ) {
        super(router, alertService, dialogService, authService, validationService)
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['t']) {
                this.validationService.validateUser(params['t']).then(() => {
                    if (this.authService.user) {
                        this.authService.user.is_validated = true
                    }
                    this.dialogService.success(
                        "Your account is validated",
                        "Your account has been successfully validated.",
                        "/login"
                    )
                }).catch(error => {
                    switch (error) {
                        case "BadRequest":
                            this.errorMsg = "Your request is not valid";
                            this.displayRetry = false;
                            return null;
                        case "UnprocessableEntity":
                            this.errorMsg = "Your validation link is not valid.";
                            this.displayRetry = true;
                            return null;
                        case "InternalServerError":
                            this.errorMsg = "Your request encountered an unexpected error.";
                            this.displayRetry = false;
                            return null;
                        case "ServiceUnavailable":
                            this.errorMsg = "Our service is momentarily unavailable.";
                            this.displayRetry = false;
                            return null;
                        default:
                            this.errorMsg = "Our service is momentarily unavailable.";
                            this.displayRetry = false;
                            return null;
                    }
                })
            } else {
                this.errorMsg = "Your validation link is not valid.";
                this.displayRetry = true;
            }
      });
    }
}
