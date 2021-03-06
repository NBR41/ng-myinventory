import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
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

    resetPassword(password: string, token: string): Promise<boolean> {
      return this.http
        .post(this.Url, JSON.stringify({password: password, token: token}), {headers: this.getHeaders()})
        .toPromise()
        .then(() => true)
        .catch(this.handleError);
    }
}
