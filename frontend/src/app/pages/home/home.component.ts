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

    const paginate:ObjectPaginate = {
      criteriaToSsearch:'',
      limit:16,
      offset:0
    }

      this.productService.getAllproducts(paginate).subscribe((resp)=>{
        this.totalElements = resp.totalElements
        this.ListProduc = resp.content;
      })
  }

  
  public getProductsPaginate(offset:Number){

    console.log(offset)

    const paginate:ObjectPaginate ={
      criteriaToSsearch:'',
      limit:16,
      offset:offset
    }

    this.productService.getAllproducts(paginate).subscribe((res)=>{
      this.ListProduc = res.content;
      this.totalElements = res.totalElements;
    })
  }


}
