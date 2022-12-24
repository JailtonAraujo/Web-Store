import { createReducer, createAction, on, props } from "@ngrx/store";
import { exists } from "fs";
import { CartOrders } from "../model/CartOrders";
import { OrderItem } from "../model/OrderItem";

enum actionsTypes {
    addOnCartType="addOnCart"
}

export const initialState: CartOrders = {
   listOrderItem:[],
   total:0
}

const verifyIfAlreadyExists = (itemOrder:OrderItem,listOrderItem:Array<OrderItem>)=>{
    
   return listOrderItem.filter( item => item.product.id === itemOrder.product.id ).length == 1 ? true : false;
   
   //const exists = result.length == 1 ? true : false 

   //return result;
}

const calcTotal = (list:Array<OrderItem>) =>{

    let total = 0 
    
    list.map((item)=>{

     total = total + (Number(item.quantidade) * item.product.price);
 })

 return total;
}

export const addOnCart = createAction (
    actionsTypes.addOnCartType,
    props<{payload:OrderItem}>()
)


export const cartReducer = createReducer(
    initialState,
    on(addOnCart,(state, {payload})=>{

        if(!verifyIfAlreadyExists(payload,state.listOrderItem)){
            let list:Array<OrderItem> = [];
            list = [...list, ...state.listOrderItem]
            list.push(payload) 
            state = {...state, listOrderItem:list}
            state = {...state, total:Number(calcTotal(state.listOrderItem))}
        }

        return state;
    })
)