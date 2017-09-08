import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

export class BaseService {

    private headers = new Headers({'Content-Type': 'application/json'});

    private tokenHeaders = new Headers({'Content-Type': 'application/json'});

    constructor(protected http: Http) {}

    protected handleError(error: any): Promise<any> {
        if (error.status) {
            switch (error.status) {
                case 400:
                    return Promise.reject("BadRequest");
                case 401:
                    return Promise.reject("Unauthorized");
                case 404:
                    return Promise.reject("NotFound");
                case 422:
                    if (error._body) {
                        switch (error.json().detail) {
                            case 'duplicate email':
                                return Promise.reject("DuplicateEmail");
                            case 'duplicate nickname':
                                return Promise.reject("DuplicateNickname");
                        }
                    }
                    return Promise.reject("UnprocessableEntity");
                case 500:
                    return Promise.reject("InternalServerError");
                case 503:
                    return Promise.reject("ServiceUnavailable");
            }
        }
        return Promise.reject(error.message || error);
    }

    protected handleObservableError(error: any) {
        if (error.status) {
            switch (error.status) {
                case 400:
                    return Observable.throw("BadRequest");
                case 401:
                    return Observable.throw("Unauthorized");
                case 404:
                    return Observable.throw("NotFound");
                case 422:
                    if (error._body) {
                        switch (error.json().detail) {
                            case 'duplicate email':
                                return Observable.throw("DuplicateEmail");
                            case 'duplicate nickname':
                                return Observable.throw("DuplicateNickname");
                        }
                    }
                    return Observable.throw("UnprocessableEntity");
                case 500:
                    return Observable.throw("InternalServerError");
                case 503:
                    return Observable.throw("ServiceUnavailable");
            }
        }
        return Observable.throw(error.message || error);
    }

    protected getHeaders(): Headers {
        return this.headers
    }

    protected getTokenHeaders(userToken: string): Headers {
        this.tokenHeaders.set('Authorization', 'Bearer ' + userToken)
        return this.tokenHeaders
    }
}
