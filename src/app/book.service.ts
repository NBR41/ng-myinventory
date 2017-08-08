import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/toPromise';

import { Book } from './book';

@Injectable()
export class BookService {

    private Url: string;

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
        this.Url = `${environment.apihost}/books`;
}

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    getBooks(): Promise<Book[]> {
        return this.http.get(this.Url)
             .toPromise()
             .then(response => response.json().data as Book[])
             .catch(this.handleError);
    }

    getBook(id: number): Promise<Book> {
      const url = `${this.Url}/${id}`;
      return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Book)
        .catch(this.handleError);
    }

    create(isbn: string, name: string): Promise<Book> {
      return this.http
        .post(this.Url, JSON.stringify({isbn: isbn, name: name}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Book)
        .catch(this.handleError);
    }

    createWithIsbn(isbn: string): Promise<Book> {
      return this.http
        .post(this.Url, JSON.stringify({isbn: isbn}), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data as Book)
        .catch(this.handleError);
    }

    update(book: Book): Promise<Book> {
      const url = `${this.Url}/${book.id}`;
      return this.http
        .put(url, JSON.stringify({name: name}), {headers: this.headers})
        .toPromise()
        .then(() => book)
        .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
      const url = `${this.Url}/${id}`;
      return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
    }
}
