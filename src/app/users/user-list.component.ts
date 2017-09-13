import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  selector: 'my-users',
  templateUrl: './user-list.component.html',
})

export class UserListComponent implements OnInit {

    users: User[];

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
      this.userService.getUsers().then(users => this.users = users)
    }

    edit(user: User): void {
      this.router.navigate(['/users', user.id]);
    }
/*
    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.heroService.create(name)
        .then(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        });
    }
*/
    delete(user: User): void {
      this.userService.delete(user.id, this.authService.token)
          .then(() => {
            this.users = this.users.filter(u => u !== user);
          });
    }
}
