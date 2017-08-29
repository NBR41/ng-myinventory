import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {


    constructor(private authService: AuthenticationService) { }


}
