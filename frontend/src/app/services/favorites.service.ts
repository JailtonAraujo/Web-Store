import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { environment } from 'src/environments/environment.prod';
import { Product } from '../model/Product';
import { addFavorite, FavoriteModel, removeFavorite } from '../store/favorityReducer';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private UrlApiBaseFavorites = `${environment.UrlApiBackEnd}/favorites`

  constructor( 
    private http:HttpClient,
    private favoriteReducer:Store<{favoriteReducer:FavoriteModel}>,
    private toastrService:ToastrService,
    
     ) { }

  // add product in backend and update state aplication
  public addFavoriteApi(product:Product){
    this.http.post(`${this.UrlApiBaseFavorites}/`,{id:product.id}).subscribe((response)=>{

      this.favoriteReducer.dispatch(addFavorite({payload:product}));

      this.toastrService.success('Item adicionado aos favoritos!','',{progressBar:true,closeButton:true});

    }, error =>{
      if(error.status === 400){
        this.toastrService.warning('Item já favoritado!','',{progressBar:true,closeButton:true});
      }
    })
  } 



  public getFavoritesApi(){
    return this.http.get(`${this.UrlApiBaseFavorites}/`);
  }


  // add product in backend and update state aplication
  public removeProductFavoritesApi(productId:number){ 

    this.http.delete(`${this.UrlApiBaseFavorites}/${productId}`).subscribe((response)=>{

      this.favoriteReducer.dispatch(removeFavorite({payload:productId}));//

      this.toastrService.success('Item removido dos favoritos!','',{progressBar:true,closeButton:true});
    })
  }


}
