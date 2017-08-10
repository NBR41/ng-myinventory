import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class PasswordService {
    private Url: string;  // URL to web api

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
        this.Url = `${environment.apihost}/password`;
    }

    sendResetLink(email: String): Promise<boolean> {
        return this.http.get(this.Url)
        .toPromise()
        .then(() => true)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
