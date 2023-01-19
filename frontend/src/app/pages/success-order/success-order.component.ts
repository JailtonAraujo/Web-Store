import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Order } from 'src/app/model/Order';
import { OrderService } from 'src/app/services/order.service';
import { offLoading, onLoading } from 'src/app/store/loadingReducer';
import { resetOrder } from 'src/app/store/orderReducer';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.sass']
})
export class SuccessOrderComponent implements OnInit {

  constructor(
    private orderReducer:Store<{orderReducer:Order}>,
    private router:Router,
    private orderService:OrderService,
    private loadingReducer:Store<{loadingReducer:Boolean}>
  ) { }

  order$ = this.orderReducer.select('orderReducer').pipe(map(state => state));

  ngOnInit(): void {
    this.order$.subscribe((order)=>{
      if(order.items.length === 0){
        this.router.navigate(['/']);
      }
    }).unsubscribe();
  }

  public continue (){
    this.orderReducer.dispatch(resetOrder());
    this.router.navigate(['/']);
  }

  public downloadProof(){

    this.orderReducer.select('orderReducer').subscribe((order)=>{

      this.loadingReducer.dispatch(onLoading());

      this.orderService.downloadProofOrder(Number(order!.id)).subscribe((proof)=>{

        const anchor = document.createElement('a');
        anchor.download="comprovante download";
        anchor.type="application/pdf";
        anchor.href=proof;

        anchor.dispatchEvent(new MouseEvent('click'));
        this.loadingReducer.dispatch(offLoading());

      },error=>{
        this.loadingReducer.dispatch(offLoading());
      })

    }).unsubscribe();

  }

}
