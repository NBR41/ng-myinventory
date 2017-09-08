import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../_services/book.service';
import { AlertService } from '../alerts/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Book } from '../_models/book';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'book-detail',
  templateUrl: './book-detail.component.html',
})
export class BookDetailComponent implements OnInit {

    @Input() book: Book;

    title: string;

    constructor(
      private route: ActivatedRoute,
      private location: Location,
      private alertService: AlertService,
      private authService: AuthenticationService,
      private bookService: BookService,
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data: { book: Book }) => {
            this.title = data.book.name;
            this.book = data.book;
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
      this.bookService.update(this.book, this.authService.token+"bl")
        .then(() => this.goBack())
        .catch(
            error => {
                switch (error) {
                    case "NotFound":
                        this.goBack();
                        return null;
                    case "InternalServerError":
                        this.alertService.error("Your request encountered an unexpected error.");
                        return null;
                    default:
                        this.alertService.error("Our service is momentarily unavailable.");
                        return null;
                }
            }
        );
    }
}
