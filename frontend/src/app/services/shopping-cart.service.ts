import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthModel } from '../model/authModel';
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
    private toastrService:ToastrService,
    private authReducer:Store<{authReducer:AuthModel}>,
    private router:Router
    ) { }

  // add product in backend and update state aplication
  public addProductInCartApi(product:Product, quant?:number){

    this.authReducer.select('authReducer').pipe(map(state=>state)).subscribe((auth)=>{
      if(!auth.token){
        this.toastrService.warning('Faça login para adicionar itens ao carrinho!','');
        this.router.navigate(['/login']);
        return;
      }


      this.cartReducer.select('cartReducer').subscribe((state)=>{
        if(state.listOrderItem.length >= 10){
          this.toastrService.warning('Quatidade maxima de 10 itens no carrinho atingida!','');
          return
        }
  
        this.http.post(`${this.UrlApiBaseShoppingCart}/`,{id:product.id})
      .subscribe((response)=>{
  
        const orderItem:OrderItem = {
          product:product,
          quantity: quant ? quant : 1
        }
  
        this.cartReducer.dispatch(addOnCart({payload:orderItem}));
        this.toastrService.success('Item adicionado ao carrinho!','');
  
      }, error =>{
          console.log(error)
          if(error.status === 400){
            this.toastrService.warning('Item já adicionado no carrinho!','');
          }
      })
  
  
      }).unsubscribe()

    }).unsubscribe()

  }

  public getCartProductsApi(){

    this.http.get<Array<Product>>(`${this.UrlApiBaseShoppingCart}/`).subscribe((response)=>{

      const listOrdem:Array<OrderItem> = response.map((product)=>{
        return {product, quantity:1}
      })

      this.cartReducer.dispatch(setProductsInCart({payload:listOrdem}));

    })

  }


  // remove product in backend and update state aplication
  public removeProductCartApi( id:number){
     this.http.delete(`${this.UrlApiBaseShoppingCart}/${id}`)
     .subscribe((response)=>{
      this.cartReducer.dispatch(removeOntCart({ payload: id }));
      this.toastrService.success('Item removido do carrinho!','')
     })
  }

}
