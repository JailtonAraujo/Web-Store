import { Component, OnInit } from '@angular/core';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/model/Order';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-finalize-order',
  templateUrl: './finalize-order.component.html',
  styleUrls: ['./finalize-order.component.sass']
})
export class FinalizeOrderComponent implements OnInit {

  faWallet=faWallet;

  valueTotal:Number = 0;

  constructor(private orderReducer:Store<{orderReducer:Order}>) { }

  Order$ = this.orderReducer.select('orderReducer').pipe( map(state => state));

  ngOnInit(): void {
   
  }

}
