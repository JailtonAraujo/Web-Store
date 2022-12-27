import { Component, OnInit } from '@angular/core';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/model/Order';
import { changeQuantity } from 'src/app/store/orderReducer';
import { changeQuantOrder } from 'src/app/store/orderReducer'; 

@Component({
  selector: 'app-finalize-order',
  templateUrl: './finalize-order.component.html',
  styleUrls: ['./finalize-order.component.sass']
})
export class FinalizeOrderComponent implements OnInit {

  faWallet=faWallet;

  valueTotal = 1;

  constructor(private orderReducer:Store<{orderReducer:Order}>) { }

  Order$ = this.orderReducer.select('orderReducer').pipe( map(state => state));

  ngOnInit(): void {
   
  }


  public changeQuantityItem(id:number, num:number){

    const changeQuant:changeQuantOrder={
      idPrduct:Number(id),
      quant:Number(num)
    }

    this.orderReducer.dispatch(changeQuantity({payload:changeQuant}))    
  }

  public incrementValue(id:any, num:any){
    num == 7 ? num : num++;
    this.changeQuantityItem(id,num);
  }

  public decrementValue(id:any, num:any){

    num == 1 ? 1 : num-- 

    this.changeQuantityItem(id,num);

    // if(num === 1){
    //   return;
    // }else{
    //   num--
    //   this.changeQuantityItem(id,num);
    // }
  
  }

}
