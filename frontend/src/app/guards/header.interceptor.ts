import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(
    private toastService:ToastrService
  ) {}

  urlsWithoutToken = {
     product:'/product',
     authRegister:'/auth/register',
     authLogin:'/auth/authenticate',
     addresFrete:'/address/frete-prazo'
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const urlApiBase = environment.UrlApiBackEnd;
    const urlForVerify = urlApiBase+request.url.split(urlApiBase)[1];

    if(urlForVerify.includes(urlApiBase+this.urlsWithoutToken.product)){
      return next.handle(request);
    }else if(urlForVerify.includes(urlApiBase+this.urlsWithoutToken.authRegister) ){
      return next.handle(request);
    }else if (urlForVerify.includes(urlApiBase+this.urlsWithoutToken.authLogin) ){
      return next.handle(request);
    }else if( urlForVerify.includes(urlApiBase+this.urlsWithoutToken.addresFrete) ){
      return next.handle(request);
    }

    if(localStorage.getItem('auth') !== null && localStorage.getItem('auth') !== '')  {

    const token = JSON.parse( String(localStorage.getItem('auth'))).token;

    if(token){
      request = request.clone({
        setHeaders: {'Authorization':token}
      })
    }
  }

    return next.handle(request).pipe(catchError(this.handlerError));

  }


  handlerError(error: HttpErrorResponse){
    let errorMsg = '';
    if(error.status == 403){
      console.log("Acesso negado ou sessão expirada, faça login!");
      this.toastService.error('Acesso negado ou sessão expirada, faça login!','')
      localStorage.clear();
    } 
     else if(error.status == 500){
      errorMsg = "Erro interno, por favor, tente mais tarde";
      this.toastService.error('Oops, um erro inesperado aconteceu, tente novamente mais tarde.','')
    }else{
      console.log(error.error);
    return throwError(error);
    }

    console.log(errorMsg);
    return throwError(error);
  }

}
