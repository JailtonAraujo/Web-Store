import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faWallet, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/model/Order';
import { changeQuantityOrderType, removeFromListFinalize, setFreteInOrder, setOrder } from 'src/app/store/orderReducer';
import { changeQuantOrder } from 'src/app/store/orderReducer'; 
import { FreteService } from 'src/app/services/frete.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdressModel } from 'src/app/model/adressModel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { offLoading, onLoading } from 'src/app/store/loadingReducer';
import { AuthModel } from '../../model/authModel';

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
    private toastrService:ToastrService,
    private router:Router,
    private orderService:OrderService,
    private loadingReducer:Store<{loadingReducer:Boolean}>,
    ) { }

  Order$ = this.orderReducer.select('orderReducer').pipe( map(state => state));
  currentSaldo:number = JSON.parse(String(localStorage.getItem('auth'))).wallet;

  ngOnInit(): void {
    this.formAddress = new FormGroup({
      cep : new FormControl('' ,[Validators.required,Validators.minLength(8)]),
      uf : new FormControl('' ),
      city : new FormControl('' ),
      logradouro : new FormControl('' ,[Validators.required]),
      number : new FormControl('' ,[Validators.required]),
      complement: new FormControl('',[Validators.required]),
      whoReceive: new FormControl('',[Validators.required])
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

    this.loadingReducer.dispatch(onLoading());
    this.freteService.saveAddress(this.formAddress.value).subscribe((response)=>{

      this.listAddress.push(response);

      this.modalRef?.hide()

      this.toastrService.success('Novo Endereço adicionado','');
      this.loadingReducer.dispatch(offLoading());
    },error=>{
      this.loadingReducer.dispatch(offLoading());
    })

    
  }


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

  public finalizeOrder(){

    if( this.valueCalcFrete.price === 0 ){
      this.toastrService.warning('Selecione um endereço de entrega!','');
      return;
    }

    this.orderReducer.dispatch(setFreteInOrder({payload:this.valueCalcFrete.price}));
    

    this.Order$.subscribe((order)=>{
      this.loadingReducer.dispatch(onLoading());

      this.orderService.newOrder(order).subscribe((response)=>{

        this.orderReducer.dispatch(setOrder({payload:response}));

        console.log(response)

        this.loadingReducer.dispatch(offLoading());

       let tempUser:AuthModel = JSON.parse(String(localStorage.getItem('auth'))) as AuthModel;

        const newUser:AuthModel ={
          name:tempUser.name,
          lastname:tempUser.lastname,
          token:tempUser.token,
          wallet:(Number(tempUser.wallet) - (order.valueItems+order.frete))
        }

        localStorage.setItem('auth',JSON.stringify(newUser));


        this.router.navigate(['/order/success'])

      },error=>{
        this.loadingReducer.dispatch(offLoading());
        this.toastrService.error('Oops, erro inesperado, revise as informações e tente mais tarde!','')
        console.log(error);
      })

    }).unsubscribe()

  }

}
