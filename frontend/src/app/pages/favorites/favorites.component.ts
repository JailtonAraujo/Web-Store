import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { FavoriteModel} from 'src/app/store/favorityReducer';

import { faTrash, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/model/Product';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.sass']
})
export class FavoritesComponent implements OnInit {

  //icons
  faTrash = faTrash;
  faCartPlus = faCartPlus;

  constructor( 
    private favoriteReducer:Store<{favoriteReducer:FavoriteModel}>,
    private favoriteService:FavoritesService,
    private cartService:ShoppingCartService
     ) { }

  favorite$ = this.favoriteReducer.select('favoriteReducer').pipe(map(state => state));

  ngOnInit(): void {

  }


  public removeProductOnFavorite(id:any){

    this.favoriteService.removeProductFavoritesApi(Number(id));

  }


  public addProductInCart (product:Product) {

    this.cartService.addProductInCartApi(product);
  }

}
