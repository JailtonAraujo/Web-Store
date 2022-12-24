import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { CartOrders } from 'src/app/model/CartOrders';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.sass']
})
export class CartComponentComponent implements OnInit {

  constructor(private cartReducer:Store<{cartReducer:CartOrders}>) { }

  cart$ = this.cartReducer.select('cartReducer').pipe(map(state => state));

  ngOnInit(): void {
  }

}
