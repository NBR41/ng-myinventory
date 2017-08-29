import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'dialog-success',
    templateUrl: 'dialog.html'
})
export class SuccessDialog {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) { }
}
