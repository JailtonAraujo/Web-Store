import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/model/Product';

import { ProductService } from 'src/app/services/product.service';
import { offLoading, onLoading } from 'src/app/store/loadingReducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  ListProduc:Array<Product>=[];

  totalElements!:number;

  nameSearch!:String | null;

  categoryId!:Number;

  constructor(
    private productService:ProductService,
    private loadingReducer:Store<{loadingReducer:Boolean}>
    ) { }

  ngOnInit(): void {
    this.getProductsPaginate(0);
  }

  
  public getProductsPaginate(offset:Number){

    if(this.nameSearch){
      this.searchProduct(this.nameSearch,offset);
      this.categoryId=0;

    } else if(this.categoryId > 0){
      this.findByCategory(this.categoryId,offset)
      console.log('bateaqui-'+this.categoryId)
    }
    
    else{
    this.nameSearch=''
    this.categoryId=0;
    this.loadingReducer.dispatch(onLoading());
    this.productService.getAllproducts({limit:16,offset}).subscribe((res)=>{
      this.ListProduc = res.content;
      this.totalElements = res.totalElements;
      this.loadingReducer.dispatch(offLoading());
    },error=>{
      this.loadingReducer.dispatch(offLoading());
    })
  }
    
  }

  public searchProduct(nameSearch:String, offset:Number){
    this.loadingReducer.dispatch(onLoading());
    this.nameSearch = nameSearch;
    this.categoryId=0;
    this.productService.searchProduct({limit:16,offset:offset,name:nameSearch}).subscribe((res)=>{
      this.ListProduc = res.content;
      this.totalElements = res.totalElements;
      this.loadingReducer.dispatch(offLoading());
    },error=>{
      this.loadingReducer.dispatch(offLoading());
    })
  }

  public findByCategory(category:Number,offset:Number){
    this.categoryId = category;
    this.nameSearch = '';
    this.loadingReducer.dispatch(onLoading());
    this.productService.findProductsByCategory({category:category,offset:offset}).subscribe((response)=>{
      this.ListProduc = response.content;
      this.totalElements = response.totalElements;
      this.loadingReducer.dispatch(offLoading());
    },error=>{
      this.loadingReducer.dispatch(offLoading());
    })
  }

  public findOfferOfDay(num:Number){
    this.categoryId = 0;
    this.nameSearch = '';
    this.loadingReducer.dispatch(onLoading());
    this.productService.getAllproducts({limit:16,offset:0}).subscribe((res)=>{
      this.ListProduc = res.content;
      this.totalElements = res.totalElements;
      this.loadingReducer.dispatch(offLoading());
    },error=>{
      this.loadingReducer.dispatch(offLoading());
    })
  }


}
