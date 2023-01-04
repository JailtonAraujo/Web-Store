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
import { AdressModel } from 'src/app/model/adressModel';

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

  addressModel!:AdressModel;
  formAddress!:FormGroup;
  listAddress:Array<AdressModel> = [];

  valueCalcFrete={
    price:Number(),
    prazo:0
  }

  loading = false;

  constructor(
    private orderReducer:Store<{orderReducer:Order}>,
    private modalService: BsModalService,
    private freteService:FreteService
    ) { }

  Order$ = this.orderReducer.select('orderReducer').pipe( map(state => state));

  ngOnInit(): void {
    this.formAddress = new FormGroup({
      cep : new FormControl(this.addressModel ? this.addressModel.cep : '' ,[Validators.required,Validators.minLength(8)]),
      uf : new FormControl(this.addressModel ? this.addressModel.uf : '' ),
      city : new FormControl(this.addressModel ? this.addressModel.city : '' ),
      logradouro : new FormControl(this.addressModel ? this.addressModel.logradouro : '' ,[Validators.required]),
      number : new FormControl(this.addressModel ? this.addressModel.number : '' ,[Validators.required]),
      complement: new FormControl(this.addressModel ? this.addressModel.complement : '',[Validators.required])
    })

  }


  public changeQuantityItem(id:number, num:number){
    
    const changeQuant:changeQuantOrder={
      idPrduct:id,
      quant:num
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


  //Search informations cep in Api via cep and seting listAddress
  public searchCep(event:any){
    const input = event.target as HTMLInputElement;
    const value =  input.value;

    this.formAddress.get('uf')?.setValue("...");
    this.formAddress.get('city')?.setValue("...");

    this.freteService.searchCep(value).subscribe((result)=>{

      this.formAddress.get('uf')?.setValue(result.uf);
      this.formAddress.get('city')?.setValue(result.localidade);
    }, error=>{
      this.formAddress.get('uf')?.setValue("");
      this.formAddress.get('city')?.setValue("");
    })
   
  }

  public addAddress(){

    this.listAddress.push(this.formAddress.value);

    this.modalRef?.hide()
  }

  //Edit address information on formAddress
  public updateAddress(index:number,template: TemplateRef<any>){
    const address = this.listAddress[index];

    this.formAddress.get('cep')?.setValue(address.cep);
    this.formAddress.get('uf')?.setValue(address.uf);
    this.formAddress.get('city')?.setValue(address.city);
    this.formAddress.get('logradouro')?.setValue(address.logradouro);
    this.formAddress.get('number')?.setValue(address.number);
    this.formAddress.get('complement')?.setValue(address.complement);

    this.openModal(template);

  }

  public calcFreteAndPrazo (index:number){
    
    const cep = this.listAddress[index].cep;
    this.loading = true;
    this.freteService.calFretePrazo(cep).subscribe((result)=>{
      this.valueCalcFrete={
        price:Number(result.Servicos.cServico.Valor.replace(',',".")),
        prazo:result.Servicos.cServico.PrazoEntrega,
      }

      ///this.valueTotalOrder =  Number(this.valueTotalOrder) + Number(result.Servicos.cServico.Valor.replace(',',"."))

      this.loading = false;
    }, error=>{
      this.loading = false;
    })

  }

}
