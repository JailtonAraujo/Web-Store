import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Order } from '../model/Order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseApiUrlOrder = environment.UrlApiBackEnd+"/order"

  constructor(private http:HttpClient) { }

  public getAllOrdersPaginate({limit,offset}:any){

    return this.http.get<any>(`${this.baseApiUrlOrder}/?limit=${limit}&offset=${offset}`);

  }

  public getOrderDetails(id:number){

    return this.http.get<Order>(`${this.baseApiUrlOrder}/details/${id}`);

  }
  
}
