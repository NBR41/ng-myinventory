import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { Ownership } from '../_models/ownership';
import { environment } from '../../environments/environment';
import { sprintf } from 'sprintf-js';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OwnershipService extends BaseService {

    private Urlfmt: string;  // URL to web api

    constructor(protected http: Http) {
        super(http)
        this.Urlfmt = `${environment.apihost}/users/%d/ownerships`;
     }

    getOwnerships(user_id: number, user_token: string): Promise<Ownership[]> {
      return this.http
        .get(sprintf(this.Urlfmt, user_id), {headers: this.getTokenHeaders(user_token)})
        .toPromise()
        .then(response => response.json() as Ownership[])
        .catch(this.handleError);
    }

    getOwnership(user_id: number, user_token: string, book_id: number): Promise<Ownership> {
      return this.http
        .get(`${sprintf(this.Urlfmt, user_id)}/${book_id}`, {headers: this.getTokenHeaders(user_token)})
        .toPromise()
        .then(response => response.json().data as Ownership)
        .catch(this.handleError);
    }

    create(user_id: number, user_token: string, book_id: number): Promise<Ownership> {
      return this.http
        .post(sprintf(this.Urlfmt, user_id), JSON.stringify({book_id: book_id}), {headers: this.getTokenHeaders(user_token)})
        .toPromise()
        .then(res => res.json().data as Ownership)
        .catch(this.handleError);
    }

    add(user_id: number, user_token: string, isbn: string): Promise<Ownership> {
      return this.http
        .post(sprintf(this.Urlfmt, user_id)+'/isbn', JSON.stringify({isbn: isbn}), {headers: this.getTokenHeaders(user_token)})
        .toPromise()
        .then(res => res.json().data as Ownership)
        .catch(this.handleError);
    }

    delete(user_id: number, user_token: string, book_id: number): Promise<void> {
      return this.http
        .delete(`${sprintf(this.Urlfmt, user_id)}/${book_id}`, {headers: this.getTokenHeaders(user_token)})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
}
