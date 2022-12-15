import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';

const modules = [
  BrowserAnimationsModule,
  ModalModule.forRoot()
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ]
  ,
  exports:[
    modules
  ]
})
export class NgxbootstrapModule { }
