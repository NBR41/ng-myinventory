import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SuccessDialog } from './dialog.component'
import { MdDialog } from '@angular/material';

@Injectable()
export class DialogService {
    constructor(
        private router: Router,
        private dialog: MdDialog
    ) { }

    success(title: string, message: string, url: string) {
        console.log({title: title, message: message})
        let dialogref = this.dialog.open(
            SuccessDialog,
            {data: {title: title, message: message}, disableClose: true, panelClass: "custom-dialog"}
        );
        dialogref.afterClosed().subscribe(() => this.router.navigate([url]));
    }
}
