import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  ListProduc!:Array<Product>;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
      this.productService.getAllproducts().subscribe((resp)=>{
        this.ListProduc = resp;
      })
  }

  

}
