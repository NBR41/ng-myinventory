import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { BaseService } from './base.service';
import { Book } from '../_models/book';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';


@Injectable()
export class BookService extends BaseService  {

    private Url: string;

    constructor(protected http: Http) {
        super(http)
        this.Url = `${environment.apihost}/books`;
    }

    getBooks(): Promise<Book[]> {
        return this.http
          .get(this.Url, {headers: this.getHeaders()})
          .toPromise()
          .then(response => response.json() as Book[])
          .catch(this.handleError);
    }

    getBook(id: number): Observable<Book> {
      const url = `${this.Url}/${id}`;
      return this.http
        .get(url, {headers: this.getHeaders()})
        .map(response => response.json() as Book)
        .catch((error: any) => this.handleObservableError(error));
    }

    create(isbn: string, name: string, user_token: string): Promise<Book> {
      return this.http
        .post(this.Url, JSON.stringify({isbn: isbn, name: name}), {headers: this.getTokenHeaders(user_token)})
        .toPromise()
        .then(res => res.json().data as Book)
        .catch(this.handleError);
    }

    createWithIsbn(isbn: string, user_token: string): Promise<Book> {
      return this.http
        .post(this.Url, JSON.stringify({isbn: isbn}), {headers: this.getTokenHeaders(user_token)})
        .toPromise()
        .then(res => res.json().data as Book)
        .catch(this.handleError);
    }

    update(book: Book, user_token: string): Promise<Book> {
      const url = `${this.Url}/${book.id}`;
      return this.http
        .put(url, JSON.stringify({name: book.name}), {headers: this.getTokenHeaders(user_token)})
        .toPromise()
        .then(() => book)
        .catch(this.handleError);
    }

    delete(id: number, user_token: string): Promise<void> {
      const url = `${this.Url}/${id}`;
      return this.http
        .delete(url, {headers: this.getTokenHeaders(user_token)})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
}
