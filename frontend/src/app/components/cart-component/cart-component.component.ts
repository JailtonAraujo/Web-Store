import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { CartOrders } from 'src/app/model/CartOrders';
import { changeQuantity, removeOntCart } from 'src/app/store/cartReducer';

import { changeQuant } from 'src/app/store/cartReducer';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.sass']
})
export class CartComponentComponent implements OnInit {

  valueTotal = 1;

  constructor(private cartReducer:Store<{cartReducer:CartOrders}>) { }

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
  }

  public incrementValue(id:any, num:any){
    num == 7 ? num : num++;
    this.changeQuantityItem(id,num);
  }

  public decrementValue(id:any, num:any){

    if(num === 1){
      this.removeProductAtCart(id);
      return;
    }else{
      num--
      this.changeQuantityItem(id,num);
    }
  
  }

}
