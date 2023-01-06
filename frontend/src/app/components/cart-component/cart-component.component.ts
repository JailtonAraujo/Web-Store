import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { CartOrders } from 'src/app/model/CartOrders';
import { Order } from 'src/app/model/Order';
import { changeQuantity, removeOntCart } from 'src/app/store/cartReducer';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { changeQuant } from 'src/app/store/cartReducer';
import { setOrderToCart } from 'src/app/store/orderReducer';

import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.sass']
})
export class CartComponentComponent implements OnInit {

  //icons
  faTrash = faTrash
  faPlus = faPlus
  faMinus = faMinus;

  //variables
  valueTotal = 1;

  constructor(
    private cartReducer: Store<{ cartReducer: CartOrders }>,
    private orderReducer: Store<{ orderReducer: Order }>,
    private router: Router,
    private cartService:ShoppingCartService
  ) { }

  cart$ = this.cartReducer.select('cartReducer').pipe(map(state => state));

  ngOnInit(): void {

  }

  public removeProductAtCart(id: any) {
    this.cartService.removeProductCartApi(id);
  }



  public changeQuantityItem(id: number, num: number) {

    const changeQuant: changeQuant = {
      idPrduct: Number(id),
      quant: Number(num)
    }

    this.cartReducer.dispatch(changeQuantity({ payload: changeQuant }))
    return;
  }

  public incrementValue(id: any, num: any) {
    num == 7 ? num : num++;
    this.changeQuantityItem(id, num);
  }

  public decrementValue(id: any, num: any) {

    num === 1 ? num : num--;

    this.changeQuantityItem(id, num);

  }

  /* OBS: In this case, it is mandatory to unsubscribe from the observable, 
  because if you don't hear a change in the state, this functionality 
  will be executed, causing a malfunction in the system. */
  public sendOrdersFromFinalizeBuy() {

    this.cart$.subscribe(((cart) => {
      if (cart.listOrderItem.length < 1) {
        return;
      }

      this.orderReducer.dispatch(setOrderToCart({ payload: cart }));

      console.log('bateu aqui')

      this.router.navigate(['/order/finalize/']);
    })).unsubscribe();// uunsubscribing observable.



  }

}
