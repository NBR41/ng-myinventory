import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { BaseService } from './base.service';
import { Book } from '../_models/book';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';

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
          .then(response => response.json().data as Book[])
          .catch(this.handleError);
    }

    getBook(id: number): Promise<Book> {
      const url = `${this.Url}/${id}`;
      return this.http
        .get(url, {headers: this.getHeaders()})
        .toPromise()
        .then(response => response.json().data as Book)
        .catch(this.handleError);
    }

    create(isbn: string, name: string): Promise<Book> {
      return this.http
        .post(this.Url, JSON.stringify({isbn: isbn, name: name}), {headers: this.getHeaders()})
        .toPromise()
        .then(res => res.json().data as Book)
        .catch(this.handleError);
    }

    createWithIsbn(isbn: string): Promise<Book> {
      return this.http
        .post(this.Url, JSON.stringify({isbn: isbn}), {headers: this.getHeaders()})
        .toPromise()
        .then(res => res.json().data as Book)
        .catch(this.handleError);
    }

    update(book: Book): Promise<Book> {
      const url = `${this.Url}/${book.id}`;
      return this.http
        .put(url, JSON.stringify({name: name}), {headers: this.getHeaders()})
        .toPromise()
        .then(() => book)
        .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
      const url = `${this.Url}/${id}`;
      return this.http
        .delete(url, {headers: this.getHeaders()})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
}
