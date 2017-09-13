import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../alerts/alert.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {

    @Input() user: User;

    title: string;

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private authService: AuthenticationService,
      private alertService: AlertService,
      private userService: UserService,
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data: { user: User }) => {
            this.title = data.user.nickname;
            this.user = data.user;
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
      this.userService.update(this.user, this.authService.token)
        .then(() => this.goBack())
        .catch(
            error => {
                switch (error) {
                    case "NotFound":
                        this.goBack();
                        return null;
                    case "InternalServerError":
                        this.alertService.error("Your request encountered an unexpected error.");
                        return null;
                    default:
                        this.alertService.error("Our service is momentarily unavailable.");
                        return null;
                }
            }
        );
    }
}
