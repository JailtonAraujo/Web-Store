import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponentComponent } from './product-component/product-component.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const components =[
  ProductComponentComponent,
  ProductDetailsComponent,
  ProductListComponent
]

@NgModule({
  declarations: [
    ProductComponentComponent,
    ProductDetailsComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports:[
    components
  ]
})
export class ProductModule { }
