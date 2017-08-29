import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdDialogModule, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { DialogService } from './dialog.service'
import { SuccessDialog } from './dialog.component'

@NgModule({
  imports: [ BrowserModule, MdDialogModule ],
  declarations: [ SuccessDialog ],
  entryComponents: [ SuccessDialog ],
  providers: [
      DialogService,
      {provide: MD_DIALOG_DATA, useValue: {} },
  ]
})
export class DialogModule {}
