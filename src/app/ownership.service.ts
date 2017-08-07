import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Ownership } from './ownership';

@Injectable()
export class OwnershipService {

    private Url = '/users';  // URL to web api

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    getOwnerships(user_id: number): Promise<Ownership[]> {
        const url = `${this.Url}/${user_id}/ownerships`;
        return this.http.get(this.Url)
             .toPromise()
             .then(response => response.json().data as Ownership[])
             .catch(this.handleError);
    }

    getOwnership(user_id: number, book_id: number): Promise<Ownership> {
      const url = `${this.Url}/${user_id}/ownerships/${book_id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Ownership)
        .catch(this.handleError);
    }

    create(user_id: number, book_id: number): Promise<Ownership> {
      return this.http
        .post(`${this.Url}/${user_id}/ownerships`, JSON.stringify({book_id: book_id}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Ownership)
        .catch(this.handleError);
    }

    add(user_id: number, isbn: string): Promise<Ownership> {
      return this.http
        .post(`${this.Url}/${user_id}/ownerships`, JSON.stringify({isbn: isbn}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Ownership)
        .catch(this.handleError);
    }

    delete(user_id: number, book_id: number): Promise<void> {
      const url = `${this.Url}/${user_id}/ownerships/${book_id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
}
