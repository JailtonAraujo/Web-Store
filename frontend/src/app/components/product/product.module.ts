import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponentComponent } from './product-component/product-component.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

const components =[
  ProductComponentComponent
]

@NgModule({
  declarations: [
    ProductComponentComponent,
    ProductDetailsComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    components
  ]
})
export class ProductModule { }
