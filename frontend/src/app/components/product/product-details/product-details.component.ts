import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { faHeart as faHeartSolid, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons';
import { Product } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderService } from 'src/app/services/order.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {

  modalRef?: BsModalRef;

  cep:string = '';

  //Icons
  faHeartRegular = faHeartRegular;
  faHeartSolid = faHeartSolid;
  faTruckFast = faTruckFast;

  product!:Product;

  constructor(private productService:ProductService,
    private route:ActivatedRoute,
    private modalService: BsModalService,
    private orderService:OrderService
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.findProductById(Number(id));
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public findProductById(id:Number){
    this.productService.findProductById(id).subscribe((resp)=>{
      this.product = resp;
      console.log(resp)
    })
  }

  public calFretePrazo (){

    this.orderService.calFretePrazo('4002054901').subscribe((response)=>{
      console.log(response.Servicos.cServico);
    })

  }


}
