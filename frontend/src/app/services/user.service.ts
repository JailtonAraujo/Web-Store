import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlApiBaseuser = `${environment.UrlApiBackEnd}/user`;

  constructor( private http:HttpClient ) { }

  public registerUser (){

  }

  public getCurrentUser(){
    return this.http.get<UserModel>(`${this.urlApiBaseuser}/current-user`);
  }


  public updateProfile(passChange:any){
    return this.http.put(`${this.urlApiBaseuser}/`,passChange);
  }

}
