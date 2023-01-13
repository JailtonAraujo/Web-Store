import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Order } from 'src/app/model/Order';
import { resetOrder } from 'src/app/store/orderReducer';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.sass']
})
export class SuccessOrderComponent implements OnInit {

  constructor(
    private orderReducer:Store<{orderReducer:Order}>,
    private router:Router
  ) { }

  order$ = this.orderReducer.select('orderReducer').pipe(map(state => state));

  ngOnInit(): void {

  }

  public continue (){
    this.orderReducer.dispatch(resetOrder());
    this.router.navigate(['/']);
  }

}
