import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UserService {

    private Url: string;  // URL to web api

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
        this.Url = `${environment.apihost}/users`;
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
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

    create(email:string, nickname: string, password: string): Promise<User> {
      return this.http
        .post(this.Url, JSON.stringify({email: email, nickname: nickname, password: password}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as User)
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
