import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { User } from '../_models/user';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

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
        .then(response => response.json() as User[])
        .catch(this.handleError);
    }

    getUser(id: number): Observable<User> {
      const url = `${this.Url}/${id}`;
      return this.http
        .get(url, {headers: this.getHeaders()})
        .map(response => response.json() as User)
        .catch((error: any) => this.handleObservableError(error));
    }

    create(email:string, nickname: string, password: string): Promise<boolean> {
      return this.http
        .post(this.Url, JSON.stringify({email: email, nickname: nickname, password: password}), {headers: this.getHeaders()})
        .toPromise()
        .then(() => true)
        .catch(this.handleError);
    }

    update(user: User, user_token: string): Promise<User> {
      const url = `${this.Url}/${user.id}`;
      return this.http
        .put(url, JSON.stringify({nickname: user.nickname}), {headers: this.getTokenHeaders(user_token)})
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
