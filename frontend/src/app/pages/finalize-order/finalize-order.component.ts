import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faWallet, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/model/Order';
import { changeQuantity, removeFromListFinalize } from 'src/app/store/orderReducer';
import { changeQuantOrder } from 'src/app/store/orderReducer'; 
import { FreteService } from 'src/app/services/frete.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-finalize-order',
  templateUrl: './finalize-order.component.html',
  styleUrls: ['./finalize-order.component.sass']
})
export class FinalizeOrderComponent implements OnInit {

  //icons
  faWallet=faWallet;
  faPlus = faPlus;
  faTrash = faTrash;

  modalRef?: BsModalRef;

  valueTotal = 1;

  formAddress!:FormGroup;

  constructor(
    private orderReducer:Store<{orderReducer:Order}>,
    private modalService: BsModalService,
    private freteService:FreteService
    ) { }

  Order$ = this.orderReducer.select('orderReducer').pipe( map(state => state));

  ngOnInit(): void {
    this.formAddress = new FormGroup({
      cep : new FormControl('',[Validators.required,Validators.minLength(8)]),
      uf : new FormControl(''),
      city : new FormControl(''),
      logradouro : new FormControl('',[Validators.required]),
      number : new FormControl('',[Validators.required]),
      complement: new FormControl('',[Validators.required])

    })
  }


  public changeQuantityItem(id:number, num:number){
    
    const changeQuant:changeQuantOrder={
      idPrduct:Number(id),
      quant:Number(num)
    }

    this.orderReducer.dispatch(changeQuantity({payload:changeQuant}))    
  }

  //increment quantity at the product and recalc value order;
  public incrementValue(id:any, num:any){
    num == 7 ? num : num++;
    this.changeQuantityItem(id,num);
  }

   //decrement quantity at the product and recalc value order;
  public decrementValue(id:any, num:any){

    num === 1 ? num : num--;
    this.changeQuantityItem(id,num);
  
  }

  public removeItemFromOrder(id:any){
    this.orderReducer.dispatch(removeFromListFinalize({payload:id}));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  public searchCep(event:any){
    const input = event.target as HTMLInputElement;
    const value =  input.value;

    this.formAddress.get('uf')?.setValue("...");
    this.formAddress.get('city')?.setValue("...");

    this.freteService.searchCep(value).subscribe((result)=>{

      this.formAddress.get('uf')?.setValue(result.uf);
      this.formAddress.get('city')?.setValue(result.localidade);
    })
    
  }

}
