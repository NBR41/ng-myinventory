import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { BaseService } from './base.service'

import 'rxjs/add/operator/toPromise';


@Injectable()
export class PasswordService extends BaseService {

    private Url: string;  // URL to web api

    constructor(protected http: Http) {
        super(http)
        this.Url = `${environment.apihost}/password`;
    }

    sendResetLink(email: String): Promise<boolean> {
        return this.http
            .get(this.Url, {params: {"email": email}, headers: this.getHeaders()})
            .toPromise()
            .then(() => true)
            .catch(this.handleError);
    }
}
