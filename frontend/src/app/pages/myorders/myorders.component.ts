import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faCircleInfo, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/model/Order';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.sass']
})
export class MyordersComponent implements OnInit {

  modalRef?: BsModalRef;

  faCircleInfo = faCircleInfo;
  faReceipt = faReceipt;

  orders:Array<Order> = [];
  orderDetails:Order={frete:0,items:[],valueItems:0};

  //Paginations
  itensPerPage:Number = 5;
  p:any;
  totalElements!:number;

  constructor(
    private modalService: BsModalService,
    private orderService:OrderService
    ) {}

  ngOnInit(): void {
    this.findAllOrders();
  }

  openModalWithClass(template: TemplateRef<any>,id:any) {

    this.getOrderDetails(id);

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

  }

  public findAllOrders(){
    this.orderService.getAllOrdersPaginate({limit:10,offset:0}).subscribe((result)=>{
      this.orders = result.content;
      this.totalElements = result.totalElements;

    })
  }

  public changePageOrder(event:any){
    const offset = (Number(event-1) * Number(10));
    this.orderService.getAllOrdersPaginate({limit:10,offset}).subscribe((result)=>{
      this.orders = result.content;
      this.totalElements = result.totalElements;
    })
  }

  public getOrderDetails (id:number){

    this.orderService.getOrderDetails(id).subscribe((response)=>{
      this.orderDetails = response;
    })

  }
 
  public  formataStringData(data:any) {

    const dataValue = String(data);

    var ano  = dataValue.split("-")[0];
    var mes  = dataValue.split("-")[1];
    var dia  = dataValue.split("-")[2];
  
    return ("0"+dia).slice(-2) + '/' + ("0"+mes).slice(-2) + '/' + ano;
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }


}
