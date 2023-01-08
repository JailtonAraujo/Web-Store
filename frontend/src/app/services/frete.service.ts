import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AdressModel } from '../model/adressModel';

@Injectable({
  providedIn: 'root'
})
export class FreteService {

  //private baseApiUrlOrder = environment.UrlApiBackEnd+"/order";

  constructor(private http:HttpClient) { }

  urlBaseApiAddress = `${environment.UrlApiBackEnd}/address`;  

   public calFretePrazo(cepDestino:string){
    return this.http.get<any>(`${this.urlBaseApiAddress}/frete-prazo?cepDestino=${cepDestino}`);
  }

   public searchCep(cep:string){
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);

   }
   
   public saveAddress (address:AdressModel){
      return this.http.post<AdressModel>(`${this.urlBaseApiAddress}/`,address);
   }

   public findAllAddress(){
      return this.http.get<Array<AdressModel>>(`${this.urlBaseApiAddress}/`)
   }

   public deleteAddress(addressId:number){
    return this.http.delete(`${this.urlBaseApiAddress}/${addressId}`);
   }
   
}
