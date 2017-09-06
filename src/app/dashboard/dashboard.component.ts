import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { OwnershipService } from '../_services/ownership.service';
import { User } from '../_models/user';
import { Ownership } from '../_models/ownership';

@Component({
    selector: 'dashboard',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    ownerships: Ownership[] = [];

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private ownershipService: OwnershipService
    ) { }

    ngOnInit(): void {
        this.getOwnerships();
    }

    getOwnerships(): void {
        this.ownershipService
          .getOwnerships(this.authService.user.id, this.authService.token)
          .then(owns => this.ownerships = owns)
          .catch(() => {
              this.authService.logout();
              this.router.navigate(['/login'])
          })
    }

    addIsbn(isbn: string): void {
      isbn = isbn.trim();
      if (!isbn) { return; }
      this.ownershipService
        .add(this.authService.user.id, this.authService.token, isbn)
        .then(ownership => { this.ownerships.push(ownership); })
        .catch(error => {
        });
    }
}
