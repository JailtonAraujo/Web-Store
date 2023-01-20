import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../model/UserModel';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { offLoading, onLoading } from '../store/loadingReducer';
import { AuthModel } from '../model/authModel';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlApiBaseuser = `${environment.UrlApiBackEnd}/user`;

  constructor( 
    private http:HttpClient,
    private toastService:ToastrService,
    private loadingReducer:Store<{loadingReducer:Boolean}>
    ) { }

  
  public getCurrentUser(){
    return this.http.get<UserModel>(`${this.urlApiBaseuser}/current-user`);
  }


  public updateProfile(passChange:any){
    this.loadingReducer.dispatch(onLoading());
    return this.http.put(`${this.urlApiBaseuser}/`,passChange).subscribe((response)=>{
      this.toastService.success('Informações atualizadas com sucesso!','')
      this.loadingReducer.dispatch(offLoading());

    },error=>{
      this.loadingReducer.dispatch(offLoading());
      if(error.error.status){
        this.toastService.error('Senha atual incorreta!','')
      }
    })
  }

  public asMoreMoney (){
    
    this.http.get<Number>(`${this.urlApiBaseuser}/wallet/ask`).subscribe((response)=>{

      let tempUser:AuthModel = JSON.parse(String(localStorage.getItem('auth'))) as AuthModel;
      const newUser:AuthModel ={
        name:tempUser.name,
        lastname:tempUser.lastname,
        token:tempUser.token,
        wallet:(Number(Number(tempUser.wallet) + Number(response)))
      }
      localStorage.setItem('auth',JSON.stringify(newUser));

      if(response === 0){
        this.toastService.warning('Você ainda tem saldo suficiente!','');
      }

      this.toastService.success(`Adicionamos um valor de R$ ${response.toFixed(2)} ao seu saldo!`,'')

    },error=>{
      console.log(error);
      this.toastService.error('Não foi possivel almentarmos seu saldo!','');
    });

  }

}
