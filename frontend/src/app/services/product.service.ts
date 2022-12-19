import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  UrlApiProducts = environment.UrlApiBackEnd+'/product';

  constructor(private http:HttpClient) { }

  public getAllproducts({limit,offset}:any){
    return this.http.get<any>(`${this.UrlApiProducts}/?limit=${limit}&offset=${offset}`);
  }

  public findProductById(id:Number){
    return this.http.get<Product>(`${this.UrlApiProducts}/${id}`);
  }

  //Search product by name or category
  public searchProduct({limit,offset,name}:any){
    return this.http.get<any>(`${this.UrlApiProducts}/search?limit=${limit}&offset=${offset}&name=${name}`);
  }

}
