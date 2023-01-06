import { Component, Input, OnInit } from '@angular/core';
import { faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Product } from 'src/app/model/Product';
import { Router } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.sass']
})
export class ProductComponentComponent implements OnInit {

  constructor(
    private router:Router,
    private favoriteService:FavoritesService,
    private cartService:ShoppingCartService
    ) { }

  iconFavority = faHeartRegular;
  isFavority:Boolean = false;

  @Input() Product!:Product;

  ngOnInit(): void {

  }


  public addProductInCart(product:Product){

    this.cartService.addProductInCartApi(product);

  }


  public async addProductInFavorites(product:Product){

     this.favoriteService.addFavoriteApi(product);

    this.isFavority = true;
    this.iconFavority = faHeartSolid;
    
  }

}
