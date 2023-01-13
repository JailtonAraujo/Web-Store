import { Component } from '@angular/core';
import { ShoppingCartService } from './services/shopping-cart.service';
import { FavoritesService } from './services/favorites.service';

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
     ){}

  ngOnInit(): void {
      this.cartService.getCartProductsApi();
      this.favoriteService.getFavoritesApi();
     
  }

  


}
