import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthModel } from 'src/app/model/authModel';
import { CartOrders } from 'src/app/model/CartOrders';
import { OrderItem } from 'src/app/model/OrderItem';
import { clearAuth } from 'src/app/store/authReducer';

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
  faCart = faCartShopping

  constructor(
    private cartReducer:Store<{cartReducer:CartOrders}>,
    private router:Router,
    private authReducer:Store<{authReducer:AuthModel}>
  ) { }

  cart$ = this.cartReducer.select('cartReducer').pipe(map(state => state));
  auth$ = this.authReducer.select('authReducer').pipe(map(state => state));

  ngOnInit(): void {
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
    this.router.navigate(['/'])
  }

}
