import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'


const modules = [
  BrowserAnimationsModule,
  ModalModule.forRoot(),
  CarouselModule.forRoot(),
  BsDropdownModule.forRoot()
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
