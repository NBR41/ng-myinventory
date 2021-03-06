import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { BookService } from '../_services/book.service';
import { Book } from '../_models/book';

@Component({
  selector: 'my-books',
  templateUrl: './book-list.component.html',
})

export class BookListComponent implements OnInit {

    books: Book[];

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private bookService: BookService,
    ) { }

    ngOnInit(): void {
        this.getBooks();
    }

    getBooks(): void {
      this.bookService.getBooks().then(books => this.books = books)
    }

    edit(book: Book): void {
      this.router.navigate(['/books', book.id]);
    }
/*
    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.heroService.create(name)
        .then(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        });
    }
*/
    delete(book: Book): void {
      this.bookService.delete(book.id, this.authService.token)
          .then(() => {
            this.books = this.books.filter(b => b !== book);
          });
    }
}
