import { Component, Input, OnInit } from '@angular/core';
import { faHeart as faHeartSolid, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Product } from 'src/app/model/Product';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/model/OrderItem';
import { Store } from '@ngrx/store';
import { addOnCart } from 'src/app/store/cartReducer';
import { CartOrders } from 'src/app/model/CartOrders';
import { addFavorite, FavoriteModel } from 'src/app/store/favorityReducer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.sass']
})
export class ProductComponentComponent implements OnInit {

  constructor(
    private router:Router,
    private cartReducer:Store<{cartReducer:CartOrders}>,
    private favoriteReducer:Store<{favoriteReducer:FavoriteModel}>,
    private toastrService:ToastrService
    ) { }

  iconFavority = faHeartRegular;
  isFavority:Boolean = false;

  @Input() Product!:Product;

  ngOnInit(): void {

  }

  // public chengeIconFavority(){
  //     this.isFavority = !this.isFavority;
  //     this.isFavority ? this.iconFavority = faHeartSolid : this.iconFavority = faHeartRegular
  // }


  public addProductInCart(product:Product){
    const orderItem:OrderItem = {
      product:product,
      quantidade:1
    }

    this.cartReducer.dispatch(addOnCart({payload:orderItem}));
    this.toastrService.success('Item adicionado ao carrinho!','',{progressBar:true,closeButton:true});
  }

  public addProductInFavorites(product:Product){
    
    this.favoriteReducer.dispatch(addFavorite({payload:product}));

    this.isFavority = true;
    this.iconFavority = faHeartSolid;
    this.toastrService.success('Item adicionado aos favoritos!','',{progressBar:true,closeButton:true});
  }

}
