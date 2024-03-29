import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { ToastrModule } from 'ngx-toastr';
import { AccordionModule } from 'ngx-bootstrap/accordion';


const modules = [
  BrowserAnimationsModule,
  ModalModule.forRoot(),
  CarouselModule.forRoot(),
  BsDropdownModule.forRoot(),
  AccordionModule.forRoot(),
  ToastrModule.forRoot({timeOut:2000,progressBar:true,closeButton:true,maxOpened:5})
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
