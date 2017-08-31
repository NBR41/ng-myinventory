import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

    constructor(private authService: AuthenticationService) { }
}
