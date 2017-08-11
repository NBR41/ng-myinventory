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
        return this.http.get(this.Url, {params:{"email": email}})
        .toPromise()
        .then(() => true)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        if (error.status) {
            switch (error.status) {
                case 400:
                    return Promise.reject("BadRequest");
                case 422:
                    return Promise.reject("UnprocessableEntity");
                case 500:
                    return Promise.reject("InternalServerError");
                case 503:
                    return Promise.reject("ServiceUnavailable");
            }
        }
        return Promise.reject(error.message || error);
    }
}
