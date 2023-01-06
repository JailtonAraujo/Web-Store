import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { ToastrModule } from 'ngx-toastr';


const modules = [
  BrowserAnimationsModule,
  ModalModule.forRoot(),
  CarouselModule.forRoot(),
  BsDropdownModule.forRoot(),
  ToastrModule.forRoot({timeOut:3000})
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
