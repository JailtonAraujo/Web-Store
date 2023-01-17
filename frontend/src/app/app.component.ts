import { Component } from '@angular/core';
import { ShoppingCartService } from './services/shopping-cart.service';
import { FavoritesService } from './services/favorites.service';
import { AuthModel } from './model/authModel';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'MyStore';
  constructor(
     private cartService:ShoppingCartService,
     private favoriteService:FavoritesService,
     private authReducer:Store<{authReducer:AuthModel}>

     ){}

  ngOnInit(): void {

    this.authReducer.select('authReducer').pipe(map(state => state)).subscribe((auth)=>{

      if(auth.token){
        this.cartService.getCartProductsApi();
        this.favoriteService.getFavoritesApi();
      }

    }).unsubscribe()
     
  }

  


}
