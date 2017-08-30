import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { BaseService } from './base.service';
import { sprintf } from 'sprintf-js';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ValidationService extends BaseService {

    private Urlfmt: string;  // URL to web api

    constructor(protected http: Http) {
        super(http)
        this.Urlfmt = `${environment.apihost}/users/%d/validation`;
    }

    sendValidationLink(user_id: number, user_token: string): Promise<boolean> {
        return this.http
            .get(sprintf(this.Urlfmt, user_id), {headers: this.getTokenHeaders(user_token)})
            .toPromise()
            .then(() => true)
            .catch(this.handleError);
    }

    validateUser(user_id: number, user_token: string, token: string): Promise<boolean> {
        return this.http
            .post(sprintf(this.Urlfmt, user_id), JSON.stringify({token: token}), {headers: this.getTokenHeaders(user_token)})
            .toPromise()
            .then(() => true)
            .catch(this.handleError);
    }
}
