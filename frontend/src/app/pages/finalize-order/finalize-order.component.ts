import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faWallet, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/model/Order';
import { changeQuantityOrderType, removeFromListFinalize } from 'src/app/store/orderReducer';
import { changeQuantOrder } from 'src/app/store/orderReducer'; 
import { FreteService } from 'src/app/services/frete.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdressModel } from 'src/app/model/adressModel';
import { ToastrService } from 'ngx-toastr';

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
    private freteService:FreteService,
    private toastrService:ToastrService
    ) { }

  Order$ = this.orderReducer.select('orderReducer').pipe( map(state => state));

  ngOnInit(): void {
    this.formAddress = new FormGroup({
      cep : new FormControl('' ,[Validators.required,Validators.minLength(8)]),
      uf : new FormControl('' ),
      city : new FormControl('' ),
      logradouro : new FormControl('' ,[Validators.required]),
      number : new FormControl('' ,[Validators.required]),
      complement: new FormControl('',[Validators.required])
    })

    this.freteService.findAllAddress().subscribe((response)=>{
      this.listAddress = response;
    })

  }


  public changeQuantityItem(id:number, num:number){
    const changeQuant:changeQuantOrder={
      idPrduct:id,
      quant:num
    }

    this.orderReducer.dispatch(changeQuantityOrderType({payload:changeQuant}))    
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

    this.freteService.saveAddress(this.formAddress.value).subscribe((response)=>{

      console.log(response)

      this.listAddress.push(response);

      this.modalRef?.hide()

      this.toastrService.success('Novo Endereço adicionado','');

    })

    
  }

  // //Edit address information on formAddress
  // public updateAddress(index:number,template: TemplateRef<any>){
  //   const address = this.listAddress[index];

  //   this.formAddress.get('cep')?.setValue(address.cep);
  //   this.formAddress.get('uf')?.setValue(address.uf);
  //   this.formAddress.get('city')?.setValue(address.city);
  //   this.formAddress.get('logradouro')?.setValue(address.logradouro);
  //   this.formAddress.get('number')?.setValue(address.number);
  //   this.formAddress.get('complement')?.setValue(address.complement);

  //   this.openModal(template);

  // }


  public DeleteAddress(index:number){

    this.freteService.deleteAddress(Number(this.listAddress[index].id)).subscribe((response)=>{

      this.listAddress.splice(index,1);

      this.valueCalcFrete={
        price:Number(0),
        prazo:0,
      }

      this.toastrService.success('Endereço removido!','');

    })
  }

  public calcFreteAndPrazo (index:number){
    
    const cep = this.listAddress[index].cep;
    this.loading = true;
    this.freteService.calFretePrazo(cep).subscribe((result)=>{
      this.valueCalcFrete={
        price:Number(result.Servicos.cServico.Valor.replace(',',".")),
        prazo:result.Servicos.cServico.PrazoEntrega,
      }

      this.loading = false;
    }, error=>{
      this.loading = false;
    })

  }

}
