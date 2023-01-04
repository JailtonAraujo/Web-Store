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
    private cartReducer:Store<{cartReducer:CartOrders}>,
    private orderReducer:Store<{orderReducer:Order}>,
    private router:Router
    ) { }

  cart$ = this.cartReducer.select('cartReducer').pipe(map(state => state));

  ngOnInit(): void {
    
  }

  public removeProductAtCart(id:any){
    this.cartReducer.dispatch(removeOntCart({payload:id}));
  }

  public changeQuantityItem(id:number, num:number){

    const changeQuant:changeQuant={
      idPrduct:Number(id),
      quant:Number(num)
    }

    this.cartReducer.dispatch(changeQuantity({payload:changeQuant}))
    return;    
  }

  public incrementValue(id:any, num:any){
    num == 7 ? num : num++;
    this.changeQuantityItem(id,num);
    return;
  }

  public decrementValue(id:any, num:any){

    num === 1 ? num : num--;

    this.changeQuantityItem(id,num);
    return;

    // if(num === 1){
    //   this.removeProductAtCart(id);
    //   return;
    // }else{
    //   num--
    //   this.changeQuantityItem(id,num);
    // }
  }

  public sendOrdersFromFinalizeBuy(){
   
   this.cart$.subscribe(((cart)=>{

    if(cart.listOrderItem.length < 1){
      return;
    }

    this.orderReducer.dispatch(setOrderToCart({payload:cart}));

    this.router.navigate(['/order/finalize']);
  }));



  }

}
