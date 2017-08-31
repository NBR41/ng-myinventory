import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService extends BaseService {

    private Url: string;  // URL to web api

    constructor(protected http: Http) {
        super(http)
        this.Url = `${environment.apihost}/users`;
    }

    getUsers(): Promise<User[]> {
      return this.http
        .get(this.Url, {headers: this.getHeaders()})
        .toPromise()
        .then(response => response.json().data as User[])
        .catch(this.handleError);
    }

    getUser(id: number): Promise<User> {
      const url = `${this.Url}/${id}`;
      return this.http
        .get(url, {headers: this.getHeaders()})
        .toPromise()
        .then(response => response.json().data as User)
        .catch(this.handleError);
    }

    create(email:string, nickname: string, password: string): Promise<boolean> {
      return this.http
        .post(this.Url, JSON.stringify({email: email, nickname: nickname, password: password}), {headers: this.getHeaders()})
        .toPromise()
        .then(() => true)
        .catch(this.handleError);
    }

    update(id: number, user_token: string, nickname: string): Promise<User> {
      const url = `${this.Url}/${id}`;
      return this.http
        .put(url, JSON.stringify({nickname: nickname}), {headers: this.getTokenHeaders(user_token)})
        .toPromise()
        .then(() => User)
        .catch(this.handleError);
    }

    delete(id: number, user_token: string): Promise<void> {
      const url = `${this.Url}/${id}`;
      return this.http
        .delete(url, {headers: this.getTokenHeaders(user_token)})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
}
