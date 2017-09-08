import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BookService }  from '../_services/book.service';
import { Book }  from '../_models/book';
import 'rxjs/add/operator/catch';

@Injectable()
export class BookDetailResolver implements Resolve<Book> {

  constructor(
      private bs: BookService,
      private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> {
    let id = route.paramMap.get('id');
    return this.bs.getBook(+id).take(1).map(book => {
      if (book) {
        return book;
      } else { // id not found
        this.router.navigate(['/books']);
        return [];
      }
  }).catch(error => {
      this.router.navigate(['/books']);
      return [];
  })
  }
}
