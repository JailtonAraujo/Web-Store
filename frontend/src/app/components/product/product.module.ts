import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponentComponent } from './product-component/product-component.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PublicComponentsModule } from 'src/app/publics/public-components.module';
import { RouterModule } from '@angular/router';

const components =[
  ProductComponentComponent,
  ProductDetailsComponent,
  ProductListComponent
]

@NgModule({
    declarations: [
        components
    ],
    exports: [
        components
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        AppRoutingModule,
        PublicComponentsModule,
        RouterModule
    ]
})
export class ProductModule { }
