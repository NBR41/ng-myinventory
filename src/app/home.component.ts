import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { AuthenticationService } from './authentication.service';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    private user: User;

    constructor(private authService: AuthenticationService) { }

    ngOnInit() {
        if (this.authService.user) {
            this.user = this.authService.user
        } else {
            this.user = null
        }
    }
}
