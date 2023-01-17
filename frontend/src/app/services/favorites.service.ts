import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { AuthModel } from '../model/authModel';
import { Product } from '../model/Product';
import { addFavorite, FavoriteModel, removeFavorite, setItensInFavorites } from '../store/favorityReducer';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private UrlApiBaseFavorites = `${environment.UrlApiBackEnd}/favorites`

  constructor( 
    private http:HttpClient,
    private favoriteReducer:Store<{favoriteReducer:FavoriteModel}>,
    private toastrService:ToastrService,
    private authReducer:Store<{authReducer:AuthModel}>,
    private router:Router
     ) { }

  // add product in backend and update state aplication
  public addFavoriteApi(product:Product){

    this.authReducer.select('authReducer').pipe(map(state => state)).subscribe((auth)=>{//Verify if user is logged

      if(!auth.token){
        this.toastrService.warning('Faça login para favoritar itens!','');
        this.router.navigate(['/login']);
        return;
      }

      this.favoriteReducer.select('favoriteReducer').subscribe((item)=>{// varify max quantity itens
        if (item.products.length >= 10 ){ 
         this.toastrService.warning('limite maximo de 10 itens favoritados atingido!','');
         return;
        }
 
        this.http.post(`${this.UrlApiBaseFavorites}/`,{id:product.id}).subscribe((response)=>{
 
         this.favoriteReducer.dispatch(addFavorite({payload:product}));
   
         this.toastrService.success('Item adicionado aos favoritos!','');
   
       }, error =>{
         if(error.status === 400){
           this.toastrService.warning('Item já favoritado!','');
         }
       }) 
 
     }).unsubscribe()

    }).unsubscribe()


   
  } 



  public getFavoritesApi(){
    this.http.get<Array<Product>>(`${this.UrlApiBaseFavorites}/`).subscribe((response)=>{

      this.favoriteReducer.dispatch(setItensInFavorites({payload:response}));

    })
  }


  // add product in backend and update state aplication
  public removeProductFavoritesApi(productId:number){ 

    this.http.delete(`${this.UrlApiBaseFavorites}/${productId}`).subscribe((response)=>{

      this.favoriteReducer.dispatch(removeFavorite({payload:productId}));//

      this.toastrService.success('Item removido dos favoritos!','');
    })
  }


}
