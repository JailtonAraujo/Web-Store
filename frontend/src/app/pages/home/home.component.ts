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

  totalElements!:number;

  nameSearch!:String | null;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProductsPaginate(0);
  }

  
  public getProductsPaginate(offset:Number){

    if(this.nameSearch){
      this.productService.searchProduct({limit:16,offset:offset,name:this.nameSearch}).subscribe((res)=>{
        console.log(res);
      })

    }else{
    this.productService.getAllproducts({limit:16,offset}).subscribe((res)=>{
      this.ListProduc = res.content;
      this.totalElements = res.totalElements;
    })
  }
    
  }

  public SearchProduct(nameSearch:String){
    this.nameSearch = nameSearch;
    this.productService.searchProduct({limit:16,offset:0,name:nameSearch}).subscribe((res)=>{
      this.ListProduc = res.content;
      this.totalElements = res.totalElements;
    })
  }


}
