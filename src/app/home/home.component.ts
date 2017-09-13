import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

    private user: User;

    constructor(
        private authService: AuthenticationService,
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
}
