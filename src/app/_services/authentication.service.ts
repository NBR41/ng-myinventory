import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BaseService } from './base.service';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationService extends BaseService {

    private Url: string;

    private subject = new Subject<User>();

    public user: User;

    public token: string;

    constructor(protected http: Http) {
        super(http)
        this.Url = `${environment.apihost}/authenticate`

        // set token if saved in local storage
        var authinfo = JSON.parse(localStorage.getItem('authinfo'));
        if (authinfo) {
            this.token = authinfo.token;
            this.user = authinfo.user
            this.subject.next(this.user);
        }
    }

    getUser(): Observable<any> {
        return this.subject.asObservable();
    }

    login(login: string, password: string): Promise<boolean> {
        return this.http
            .post(this.Url, JSON.stringify({ login: login, password: password }), {headers: this.getHeaders()})
            .toPromise()
            .then((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {

                    // set token property
                    this.token = token;
                    this.user = response.json().user
                    this.subject.next(this.user);

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('authinfo', JSON.stringify(response.json()));
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch(this.handleError);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.user = null
        this.subject.next(this.user);
        localStorage.removeItem('authinfo');
    }
}
