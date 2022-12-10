import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

  @Input() ListProduct!:Array<Product>;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  
  }

}
