import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthModel } from 'src/app/model/authModel';
import { CartOrders } from 'src/app/model/CartOrders';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { clearAuth } from 'src/app/store/authReducer';
import { resetCart } from 'src/app/store/cartReducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() emiterNameSearch = new EventEmitter<String>();
  @Output() emiterCategory = new EventEmitter<Number>();
  @Output() emiterOfferOfDay = new EventEmitter<Number>();

  nameSearch:String = "";

  faSearch = faSearch;
  faCart = faCartShopping;

  iconBtnMenu = faBars;

  classListMenu=['drop-menu'];
  isOpen:Boolean = false

  constructor(
    private cartReducer:Store<{cartReducer:CartOrders}>,
    private router:Router,
    private authReducer:Store<{authReducer:AuthModel}>,
    private cartService:ShoppingCartService,
    private favoriteService:FavoritesService,
  ) { }

  cart$ = this.cartReducer.select('cartReducer').pipe(map(state => state));
  auth$ = this.authReducer.select('authReducer').pipe(map(state => state));

  ngOnInit(): void {
    this.authReducer.select('authReducer').pipe(map(state => state)).subscribe((auth)=>{

      if(auth.name){
        this.cartService.getCartProductsApi();
        this.favoriteService.getFavoritesApi();
      }

    }).unsubscribe()
  }

  handleNameSearch(){
    
    this.emiterNameSearch.emit(this.nameSearch);
    this.router.navigate(['/']);
  }

  public handleSearchByCategory(num:Number){
    
    this.emiterCategory.emit(num);
    this.router.navigate(['/']);
  }

  public handlerOfferOfDay(){
    
    this.emiterOfferOfDay.emit(1);
    this.router.navigate(['/']);
  }

  logOut(){
    this.authReducer.dispatch(clearAuth());
    this.cartReducer.dispatch(resetCart())
    this.router.navigate(['/'])
  }

  public openAndCloseMenu(){
    this.classListMenu = this.isOpen ? ['drop-menu'] : ['drop-menu','menu-open'];
    this.isOpen = this.isOpen ? false : true;
    this.iconBtnMenu = this.isOpen ? faXmark : faBars;
   }

}
