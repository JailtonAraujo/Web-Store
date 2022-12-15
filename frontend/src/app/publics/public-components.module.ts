import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

import {NgxPaginationModule} from 'ngx-pagination';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [
  HeaderComponent,
]

const modules = [
  NgxPaginationModule,
  FormsModule,
  ReactiveFormsModule
]

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    modules
  ],
  exports:[
    components,
    modules
  ]
})
export class PublicComponentsModule { }
