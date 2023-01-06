import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { FavoriteModel, removeFavorite } from 'src/app/store/favorityReducer';

import { faTrash, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/model/Product';
import { CartOrders } from 'src/app/model/CartOrders';
import { addOnCart } from 'src/app/store/cartReducer';
import { OrderItem } from 'src/app/model/OrderItem';

import { ToastrService } from 'ngx-toastr';

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
    private cartReducer:Store<{cartReducer:CartOrders}>,
    private toastrService:ToastrService
     ) { }

  favorite$ = this.favoriteReducer.select('favoriteReducer').pipe(map(state => state));

  ngOnInit(): void {

  }


  public removeProductOnFavorite(id:any){
      this.favoriteReducer.dispatch(removeFavorite({payload:id}));
      this.toastrService.success('Item removido dos favoritos!','',{progressBar:true,closeButton:true});
  }


  public addProductInCart (product:Product) {
    
    const orderItem:OrderItem = {
      product:product,
      quantidade:1
    }

    this.cartReducer.dispatch(addOnCart({payload:orderItem}))
    this.toastrService.success('Item adicionado ao carrinho!','',{progressBar:true,closeButton:true});
  }

}
