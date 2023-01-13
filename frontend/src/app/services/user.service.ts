import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../model/UserModel';
import { AuthModel } from '../model/authModel';
import { Store } from '@ngrx/store';
import { setAuth } from '../store/authReducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlApiBaseuser = `${environment.UrlApiBackEnd}/user`;

  constructor( 
    private http:HttpClient,
    private authReducer:Store<{authReducer:AuthModel}>
    ) { }

  public registerUser (user:UserModel){
    
    this.http.post<AuthModel>(`${this.urlApiBaseuser}/register`,user).subscribe((response)=>{

      this.authReducer.dispatch(setAuth({payload:response}));

    })

  }

  public getCurrentUser(){
    return this.http.get<UserModel>(`${this.urlApiBaseuser}/current-user`);
  }


  public updateProfile(passChange:any){
    return this.http.put(`${this.urlApiBaseuser}/`,passChange);
  }

}
