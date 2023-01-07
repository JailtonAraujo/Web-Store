import { Component, OnInit, TemplateRef } from '@angular/core';
import { faHeart as faHeartSolid, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FreteService } from 'src/app/services/frete.service';
import { Order } from 'src/app/model/Order';
import { Store } from '@ngrx/store';
import { setOrder } from 'src/app/store/orderReducer';
import { OrderItem } from 'src/app/model/OrderItem';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {

  modalRef?: BsModalRef;

  cep: string = '';
  loading: boolean = false;

  messageError = "";

  //Icons
  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;
  faTruckFast = faTruckFast;

  product!: Product;
  quaitityProduct:Number = 1

  resultCalcFrete = {
    valor: 0,
    prazo: 0,
    destino: ''
  }

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private freteService: FreteService,
    private store:Store<{orderReducer:Order}>,
    private cartService:ShoppingCartService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.findProductById(Number(id));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public findProductById(id: Number) {
    this.productService.findProductById(id).subscribe((resp) => {
      this.product = resp;
    })
  }

  public calFretePrazo() {

    this.loading = true;
    this.messageError = "";

    this.freteService.searchCep(this.cep).subscribe((res) => {

      if(res.erro){
        this.toastrService.error('Cep não encontrado!','');
        this.loading = false;
        return;
      }

      this.resultCalcFrete.destino = `${res.localidade}-${res.uf}`;

      this.freteService.calFretePrazo(this.cep).subscribe((response) => {
       
        this.resultCalcFrete = {...this.resultCalcFrete, valor:response.Servicos.cServico.Valor, 
          prazo:response.Servicos.cServico.PrazoEntrega};

        this.loading = false;
        this.modalRef?.hide()
      })

    },error=>{
      this.toastrService.error('Cep inválido!','');
        this.loading = false;
        console.log(error)
    })
  }

  public addProductInOrder (){

    let listOrderItem:Array<OrderItem> = [];

    const orderItem:OrderItem = {
      product:this.product,
      quantidade:this.quaitityProduct
    }

      listOrderItem.push(orderItem);   

      const order:Order ={
        listOrderItem:listOrderItem,
        total:0
      }

    this.store.dispatch(setOrder({payload:order}))
  }

  public addProductInCart (){
    this.cartService.addProductInCartApi(this.product, Number(this.quaitityProduct));
  }


}
