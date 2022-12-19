import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/Product';
import { Observable } from 'rxjs';
import { ObjectPaginate } from '../model/ObjectPaginate';

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

}
