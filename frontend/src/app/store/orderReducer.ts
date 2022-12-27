import { createAction, createReducer, props, on  } from "@ngrx/store"; 
import { Order } from "../model/Order";
import { OrderItem } from "../model/OrderItem";

enum  actionsTypes {
    setOrder = "setOrder",
    changeQuantityOrderType ='changeQuantityOrder'
}

export interface changeQuantOrder{
    idPrduct:Number,
    quant:Number
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

const handlerChange = (listOrderItem:Array<OrderItem>,changeQuant:changeQuantOrder) =>{
    
    let objTemp = listOrderItem.filter((item)=>{
        return item.product.id === changeQuant.idPrduct
    })

    const index = listOrderItem.indexOf(objTemp[0]) ;

    listOrderItem = listOrderItem.filter((item)=>{
        return item.product.id !== changeQuant.idPrduct;
    })

   const obj:OrderItem = {...objTemp[0], quantidade:changeQuant.quant}

   listOrderItem.splice(index, 0, obj);

  return listOrderItem;
}


export const setOrder = createAction(
    actionsTypes.setOrder,
    props<{payload:Order}>()
)

export const changeQuantity = createAction(
    actionsTypes.changeQuantityOrderType,
    props<{payload:changeQuantOrder}>()
)


export const orderReducer = createReducer(
    initialState,
    on(setOrder, (state, {payload})=>{
        state = {...state, listOrderItem:payload.listOrderItem, total:Number(calcTotal(payload.listOrderItem))}
        return state;
    }),
    on(changeQuantity,(state,{payload})=>{

        state = {...state, listOrderItem:handlerChange(state.listOrderItem,payload)}
        state = {...state, total:Number(calcTotal(state.listOrderItem))}
        return state;
    })
)