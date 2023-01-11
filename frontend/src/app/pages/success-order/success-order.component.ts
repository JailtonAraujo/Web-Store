import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Order } from 'src/app/model/Order';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.sass']
})
export class SuccessOrderComponent implements OnInit {

  constructor(
    private orderReducer:Store<{orderReducer:Order}>
  ) { }

  order$ = this.orderReducer.select('orderReducer').pipe(map(state => state));

  ngOnInit(): void {

  }

}
