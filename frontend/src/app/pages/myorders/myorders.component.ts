import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { faCircleInfo, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/model/Order';
import { Store } from '@ngrx/store';
import { offLoading, onLoading } from 'src/app/store/loadingReducer';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.sass']
})
export class MyordersComponent implements OnInit {

  modalRef?: BsModalRef;

  faCircleInfo = faCircleInfo;
  faReceipt = faReceipt;
  reportDownlod!:string;

  orders:Array<Order> = [];
  orderDetails:Order={frete:0,items:[],valueItems:0};

  //Paginations
  itensPerPage:Number = 10;
  p:any;
  totalElements!:number;
  dateToFilter = "";

  constructor(
    private modalService: BsModalService,
    private orderService:OrderService,
    private loadingReducer:Store<{loadingReducer:Boolean}>
    ) {}

  ngOnInit(): void {
    this.findAllOrders({limit:10,offset:0});
  }

  openModalWithClass(template: TemplateRef<any>,id:any) {

    this.getOrderDetails(id);

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

  }

  public findAllOrders({limit,offset}:any){
    this.loadingReducer.dispatch(onLoading())
    this.orderService.getAllOrdersPaginate({limit,offset}).subscribe((result)=>{
      this.orders = result.content;
      this.totalElements = result.totalElements;
      this.dateToFilter = "";//Reseting value
      this.loadingReducer.dispatch(offLoading())
    },error=>{
      this.loadingReducer.dispatch(offLoading())
    })
  }


  public changePageOrder(event:any){
    const offset = (Number(event-1) * Number(10));

    if(this.dateToFilter){
      this.getOrdersFilterByDatePaginate({date:this.dateToFilter,limit:10,offset});// if date is present 
    }else{
      this.findAllOrders({limit:10,offset})
    }
  }

  //Find details of a order by id
  public getOrderDetails (id:number){
    this.loadingReducer.dispatch(onLoading())
    this.orderService.getOrderDetails(id).subscribe((response)=>{
      this.orderDetails = response;
      this.loadingReducer.dispatch(offLoading())
    },error=>{
      this.loadingReducer.dispatch(offLoading())
    })

  }


  public filterOrders(element:any){
    const value = element as HTMLInputElement
    this.dateToFilter = value.value;

    this.getOrdersFilterByDatePaginate({date:this.dateToFilter,limit:10,offset:0});
  }

  //Find Orders and filter by date
  public getOrdersFilterByDatePaginate({date,limit,offset}:any){
    if(date){
      this.loadingReducer.dispatch(onLoading())
    this.orderService.getOrdersFilterByDatePaginate({limit,offset,date}).subscribe((result)=>{
      this.orders = result.content;
      this.totalElements = result.totalElements;
      this.loadingReducer.dispatch(offLoading())
    },error=>{this.loadingReducer.dispatch(offLoading())})
    }else{
      this.findAllOrders({limit:10,offset:0});
    }
  }
 
  public  formataStringData(data:any) {

    const dataValue = String(data);

    var ano  = dataValue.split("-")[0];
    var mes  = dataValue.split("-")[1];
    var dia  = dataValue.split("-")[2];
  
    return ("0"+dia).slice(-2) + '/' + ("0"+mes).slice(-2) + '/' + ano;
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }

  public downloadProofOrder(idOrder:any){
    
    this.loadingReducer.dispatch(onLoading());

    this.orderService.downloadProofOrder(idOrder).subscribe((response)=>{
      const anco = document.createElement('a');
      anco.download="comprovante";
      anco.type="application/pdf"
      anco.href=response;
      anco.dispatchEvent(new MouseEvent('click'));

      this.loadingReducer.dispatch(offLoading());
    },error=>{
      this.loadingReducer.dispatch(offLoading());
    })

  }


}
