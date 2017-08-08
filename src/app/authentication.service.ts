import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { User } from './user'

@Injectable()
export class AuthenticationService {

    public user: User;

    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var authinfo = JSON.parse(localStorage.getItem('authinfo'));
        this.token = authinfo && authinfo.token;
        this.user = authinfo.user
    }

    login(login: string, password: string): Observable<boolean> {
        return this.http.post('/authenticate', JSON.stringify({ login: login, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    this.user = response.json().user

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('authinfo', JSON.stringify(response.json()));
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.user = null
        localStorage.removeItem('authinfo');
    }
}
