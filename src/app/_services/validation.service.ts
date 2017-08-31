import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { sprintf } from 'sprintf-js';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ValidationService extends BaseService {

    private Url: string;  // URL to web api

    constructor(protected http: Http) {
        super(http)
        this.Url = `${environment.apihost}/validation`;
    }

    sendValidationLink(user_id: number, user_token: string): Promise<boolean> {
      return this.http
        .get(this.Url+'/'+user_id, {headers: this.getTokenHeaders(user_token)})
        .toPromise()
        .then(() => true)
        .catch(this.handleError);
    }

    validateUser(token: string): Promise<boolean> {
      return this.http
        .post(sprintf(this.Url), JSON.stringify({token: token}), {headers: this.getHeaders()})
        .toPromise()
        .then(() => true)
        .catch(this.handleError);
    }
}
