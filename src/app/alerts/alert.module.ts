import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlertService } from './alert.service'
import { AlertComponent } from './alert.component'

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ AlertComponent ],
  exports: [ AlertComponent ],
  providers: [ AlertService ]
})
export class AlertModule {}
