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

  categoryId!:Number;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProductsPaginate(0);
  }

  
  public getProductsPaginate(offset:Number){

    if(this.nameSearch){
      this.productService.searchProduct({limit:16,offset:offset,name:this.nameSearch}).subscribe((res)=>{
        console.log(res);
      })

    } else if(this.categoryId > 0){
      this.productService.findProductsByCategory({category:this.categoryId,offset})
    }
    
    else{
    this.productService.getAllproducts({limit:16,offset}).subscribe((res)=>{
      this.ListProduc = res.content;
      this.totalElements = res.totalElements;
    })
  }
    
  }

  public SearchProduct(nameSearch:String){
    this.nameSearch = nameSearch;
    this.categoryId=0;
    this.productService.searchProduct({limit:16,offset:0,name:nameSearch}).subscribe((res)=>{
      this.ListProduc = res.content;
      this.totalElements = res.totalElements;
    })
  }

  publicFindByCategory(category:Number){
    this.categoryId = category;
    this.nameSearch = '';
    this.productService.findProductsByCategory({category:category,offset:0}).subscribe((response)=>{
      this.ListProduc = response.content;
      this.totalElements = response.totalElements;
    })
  }


}
