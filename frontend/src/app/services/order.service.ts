import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseApiUrlOrder = environment.UrlApiBackEnd+"/order"

  constructor(private http:HttpClient) { }

   public calFretePrazo(cepDestino:string){
    return this.http.get<any>(`${this.baseApiUrlOrder}/frete-prazo?cepDestino=${cepDestino}`);
  }
}
