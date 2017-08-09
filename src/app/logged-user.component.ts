import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user';
import { AuthenticationService } from './authentication.service';

@Component({
    moduleId: module.id,
    selector: 'logged-user',
    templateUrl: 'logged-user.component.html'
})

export class LoggedUserComponent implements OnInit {
    private user: User;

    constructor(private authService: AuthenticationService) { }

    ngOnInit() {
        this.user = this.authService.user
    }

    updateUser(user: User): void {
        this.user = this.authService.user
    }

    logout(): void {
        this.authService.logout()
    }
}
