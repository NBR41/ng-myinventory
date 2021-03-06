import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationService extends BaseService {

    private authUrl: string;

    private tokenUrl: string;

    private subject = new Subject<User>();

    public user: User;

    private refresh_token: string;

    public token: string;

    constructor(
        private router: Router,
        protected http: Http
    ) {
        super(http)
        this.authUrl = `${environment.apihost}/authenticate`
        this.tokenUrl = `${environment.apihost}/token`
        this.refresh_token = localStorage.getItem('authinfo')
        // set token if saved in local storage
        if (this.refresh_token != null && this.user == null) {
            let urltogo = window.location.pathname+window.location.search;
            this.autoAuth(urltogo)
        }
    }

    private autoAuth(url: string): Promise<boolean> {
      return this.authByToken(this.refresh_token).then((ret: boolean) => {
            if (!ret) {
                this.logout();
                this.router.navigate['/home'];
                return false;
            }
            this.router.navigateByUrl(url);
            return true;
        });
    }

    private authByToken(token: string): Promise<boolean> {
        return this.http
            .get(this.tokenUrl+"/auth", {headers: this.getTokenHeaders(token)})
            .toPromise()
            .then((response: Response) => this.initAuth(response))
            .catch(() => false);
    }

    getUser(): Observable<any> {
        return this.subject.asObservable();
    }

    login(login: string, password: string): Promise<boolean> {
        return this.http
            .post(this.authUrl, JSON.stringify({ login: login, password: password }), {headers: this.getHeaders()})
            .toPromise()
            .then((response: Response) => this.initAuth(response))
            .catch(this.handleError);
    }

    initAuth(response: Response): boolean  {
        // login successful if there's a jwt token in the response
        let oresp = response.json()
        if (oresp && oresp.refresh_token) {
            // set token property
            this.refresh_token = oresp.refresh_token;
            this.token = oresp.access_token
            this.user = oresp.user
            this.subject.next(this.user);

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('authinfo', this.refresh_token);
            // return true to indicate successful login
            return true;
        } else {
            // return false to indicate failed login
            return false;
        }
    }


    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.user = null
        this.refresh_token = null;
        this.subject.next(this.user);
        localStorage.removeItem('authinfo');
    }
}
