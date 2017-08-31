import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

@Component({
    moduleId: module.id,
    selector: 'logged-user',
    templateUrl: 'logged-user.component.html'
})
export class LoggedUserComponent implements OnInit {

    private user: User;

    constructor(
        protected router: Router,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        if (this.authService.user) {
            this.user = this.authService.user;
        }
        this.authService.getUser().subscribe((user: User) => {
            if (!user) {
                this.user = null;
            } else {
                this.user = user;
            }
        });
    }

    logout(): void {
        this.authService.logout()
        this.router.navigate(['/home']);
    }
}
