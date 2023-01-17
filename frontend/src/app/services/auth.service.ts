import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../model/UserModel';
import { AuthModel } from '../model/authModel';
import { Store } from '@ngrx/store';
import { clearAuth, setAuth } from '../store/authReducer';
import { offLoading, onLoading } from '../store/loadingReducer';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBaseApi = `${environment.UrlApiBackEnd}/auth`;

  constructor(
    private http:HttpClient,
    private authReducer:Store<{authReducer:AuthModel}>,
    private authLoading:Store<{authLoading:Boolean}>,
    private toastrService:ToastrService,
    private router:Router
  ) { }

    public register (user:UserModel){
      this.authLoading.dispatch(onLoading());
      this.http.post<AuthModel>(`${this.urlBaseApi}/register`,user).subscribe((response)=>{

        this.authReducer.dispatch(setAuth({payload:response}));
        this.authLoading.dispatch(offLoading());
        this.toastrService.success(`Conta criada com successo!`,'');
        this.router.navigate(['/']);

      }, error=>{
        this.authLoading.dispatch(offLoading());
        if(error.status === 400){
          this.toastrService.error('Já existe um usuario com essas informações','');
        } 
      })
    }

    public authenticate ( user:UserModel){
      this.authLoading.dispatch(onLoading());
      this.http.post<AuthModel>(`${this.urlBaseApi}/authenticate`,user).subscribe((response)=>{


        this.authReducer.dispatch(setAuth({payload:response}));
        this.authLoading.dispatch(offLoading());
        this.toastrService.success(`Bem vindo ${response.name}`,'');
        this.router.navigate(['/']);

      },error=>{
        this.authLoading.dispatch(offLoading());
        if(error.status === 403){
          this.toastrService.error('E-mail ou senha incorrentos!','');
          return;
        }else if(error.status === 500 && error.error.message.includes("Bad credentials")){
          this.toastrService.error('E-mail ou senha incorrentos!','');
        } 
          console.log(error)
        
      })

    }

    public logOut (){
      this.authReducer.dispatch(clearAuth());
    }

}
