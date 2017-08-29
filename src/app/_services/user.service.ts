import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { User } from '../_models/user';

@Injectable()
export class UserService {

    private Url: string;  // URL to web api

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
        this.Url = `${environment.apihost}/users`;
    }

    private handleError(error: any): Promise<any> {
        if (error.status) {
            switch (error.status) {
                case 400:
                    return Promise.reject("BadRequest");
                case 422:
                    switch (error.json().detail) {
                        case 'duplicate email':
                            return Promise.reject("DuplicateEmail");
                        case 'duplicate nickname':
                            return Promise.reject("DuplicateNickname");
                        default:
                            return Promise.reject("UnprocessableEntity");
                    }
                case 500:
                    return Promise.reject("InternalServerError");
                case 503:
                    return Promise.reject("ServiceUnavailable");
            }
        }
        return Promise.reject(error.message || error);
    }

    getUsers(): Promise<User[]> {
        return this.http.get(this.Url)
             .toPromise()
             .then(response => response.json().data as User[])
             .catch(this.handleError);
    }

    getUser(id: number): Promise<User> {
      const url = `${this.Url}/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as User)
        .catch(this.handleError);
    }

    create(email:string, nickname: string, password: string): Promise<boolean> {
      return this.http
        .post(this.Url, JSON.stringify({email: email, nickname: nickname, password: password}), {headers: this.headers})
        .toPromise()
        .then(() => true)
        .catch(this.handleError);
    }

    update(id: number, nickname: string): Promise<User> {
      const url = `${this.Url}/${id}`;
      return this.http
        .put(url, JSON.stringify({nickname: nickname}), {headers: this.headers})
        .toPromise()
        .then(() => User)
        .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
      const url = `${this.Url}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
}
