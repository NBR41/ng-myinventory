import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { sprintf } from 'sprintf-js'
import { environment } from '../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Ownership } from './ownership';

@Injectable()
export class OwnershipService {

    private Urlfmt: string;  // URL to web api

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
        this.Urlfmt = `${environment.apihost}/users/%d/ownerships`;
     }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    getOwnerships(user_id: number): Promise<Ownership[]> {
        return this.http.get(sprintf(this.Urlfmt, user_id))
             .toPromise()
             .then(response => response.json().data as Ownership[])
             .catch(this.handleError);
    }

    getOwnership(user_id: number, book_id: number): Promise<Ownership> {
      return this.http.get(`${sprintf(this.Urlfmt, user_id)}/${book_id}`)
        .toPromise()
        .then(response => response.json().data as Ownership)
        .catch(this.handleError);
    }

    create(user_id: number, book_id: number): Promise<Ownership> {
      return this.http
        .post(sprintf(this.Urlfmt, user_id), JSON.stringify({book_id: book_id}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Ownership)
        .catch(this.handleError);
    }

    add(user_id: number, isbn: string): Promise<Ownership> {
      return this.http
        .post(sprintf(this.Urlfmt, user_id), JSON.stringify({isbn: isbn}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Ownership)
        .catch(this.handleError);
    }

    delete(user_id: number, book_id: number): Promise<void> {
      return this.http.delete(`${sprintf(this.Urlfmt, user_id)}/${book_id}`, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
}
