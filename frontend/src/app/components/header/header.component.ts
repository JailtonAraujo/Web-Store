import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CartOrders } from 'src/app/model/CartOrders';
import { OrderItem } from 'src/app/model/OrderItem';

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
    private cartReducer:Store<{cartReducer:CartOrders}>
  ) { }

  cart$ = this.cartReducer.select('cartReducer').pipe(map(state => state));

  ngOnInit(): void {
  }

  handleNameSearch(){
    this.emiterNameSearch.emit(this.nameSearch);
  }

  public handleSearchByCategory(num:Number){
    this.emiterCategory.emit(num);
  }

  public handlerOfferOfDay(){
    this.emiterOfferOfDay.emit(1);
  }

}
