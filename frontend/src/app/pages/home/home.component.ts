import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { ObjectPaginate } from 'src/app/model/ObjectPaginate';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  ListProduc!:Array<Product>;

  totalElements!:number;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProductsPaginate(0);
  }

  
  public getProductsPaginate(offset:Number){
    this.productService.getAllproducts({limit:16,offset}).subscribe((res)=>{
      this.ListProduc = res.content;
      this.totalElements = res.totalElements;
    })
  }


}
