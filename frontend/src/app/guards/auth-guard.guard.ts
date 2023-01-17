import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private toastService:ToastrService,
    private router:Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(localStorage.getItem('auth') !== null ){
        return true;
      }

      let msg = '';

      switch(route.url[0].path){
        case 'cart':
          msg = "Faça login para adicionar itens ao carrinho!"
          break;
        case 'order':
          msg = "Faça login para finalizar a compra!"
          break;
        default:
          msg="Por favor faça login!"
      }

    this.router.navigate(['/login'])
    this.toastService.warning(msg,'')
    return false;
  }
  
}
