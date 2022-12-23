import { createAction, createReducer, props, on  } from "@ngrx/store"; 
import { Order } from "../model/Order";
import { OrderItem } from "../model/OrderItem";

enum  actionsTypes {
    setOrder = "setOrder"
}

export const initialState: Order = {
    listOrderItem:[],
    total:0
}

const calcTotal = (list:Array<OrderItem>) =>{

       let total = 0 
       
       list.map((item)=>{

        total = total + (Number(item.quantidade) * item.product.price);
    })

    return total;
}


export const setOrder = createAction(
    actionsTypes.setOrder,
    props<{payload:Order}>()
)


export const orderReducer = createReducer(
    initialState,
    on(setOrder, (state, {payload})=>{
        state = {...state, listOrderItem:payload.listOrderItem, total:Number(calcTotal(payload.listOrderItem))}
        return state;
    })
)