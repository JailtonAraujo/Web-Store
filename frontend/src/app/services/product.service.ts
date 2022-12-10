import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  UrlApiProducts = environment.UrlApiBackEnd+'/product';

  constructor(private http:HttpClient) { }

  public getAllproducts():Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`${this.UrlApiProducts}/`);
  }

  public findProductById(id:Number){
    return this.http.get<Product>(`${this.UrlApiProducts}/${id}`);
  }

}
