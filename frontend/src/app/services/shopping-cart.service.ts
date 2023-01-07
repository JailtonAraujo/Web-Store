import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { CartOrders } from '../model/CartOrders';
import { OrderItem } from '../model/OrderItem';
import { Product } from '../model/Product';
import { addOnCart, removeOntCart, setProductsInCart } from '../store/cartReducer';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private UrlApiBaseShoppingCart = `${environment.UrlApiBackEnd}/cart`;

  constructor( private http:HttpClient,
    private cartReducer:Store<{cartReducer:CartOrders}>,
    private toastrService:ToastrService, ) { }

  // add product in backend and update state aplication
  public addProductInCartApi(product:Product){
    this.http.post(`${this.UrlApiBaseShoppingCart}/`,{id:product.id})
    .subscribe((response)=>{

      const orderItem:OrderItem = {
        product:product,
        quantidade:1
      }

      this.cartReducer.dispatch(addOnCart({payload:orderItem}));
      this.toastrService.success('Item adicionado ao carrinho!','',{progressBar:true,closeButton:true});

    }, error =>{
        console.log(error)
        if(error.status === 400){
          this.toastrService.warning('Item já adicionado no carrinho!','',{progressBar:true,closeButton:true});
        }
    })
  }

  public getCartProductsApi(){

    this.http.get<Array<Product>>(`${this.UrlApiBaseShoppingCart}/`).subscribe((response)=>{

      const listOrdem:Array<OrderItem> = response.map((product)=>{
        return {product, quantidade:1}
      })

      this.cartReducer.dispatch(setProductsInCart({payload:listOrdem}));

    })

  }


  // remove product in backend and update state aplication
  public removeProductCartApi( id:number){
     this.http.delete(`${this.UrlApiBaseShoppingCart}/${id}`)
     .subscribe((response)=>{
      this.cartReducer.dispatch(removeOntCart({ payload: id }));
      this.toastrService.success('Item removido do carrinho!','',{progressBar:true,closeButton:true})
     })
  }

}
