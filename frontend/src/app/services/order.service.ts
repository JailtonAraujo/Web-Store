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

  public newOrder(order:Order){
    return this.http.post<Order>(`${this.baseApiUrlOrder}/`,order);
  }

  public getAllOrdersPaginate({limit,offset}:any){

    return this.http.get<any>(`${this.baseApiUrlOrder}/?limit=${limit}&offset=${offset}`);

  }

  public getOrderDetails(id:number){

    return this.http.get<Order>(`${this.baseApiUrlOrder}/details/${id}`);

  }

  public getOrdersFilterByDatePaginate({limit,offset,date}:any){
    return this.http.get<any>(`${this.baseApiUrlOrder}/filter?date=${date}&limit=${limit}&offset=${offset}`);
  }

  public downloadProofOrder(idOrder:number){
    return this.http.get(`${this.baseApiUrlOrder}/proof/${idOrder}`,{responseType:'text'});
    
  }
  
}
