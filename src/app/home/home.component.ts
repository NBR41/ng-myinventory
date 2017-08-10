import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

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
