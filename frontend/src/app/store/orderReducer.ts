import { createAction, createReducer, props, on  } from "@ngrx/store"; 
import { CartOrders } from "../model/CartOrders";
import { Order } from "../model/Order";
import { OrderItem } from "../model/OrderItem";

enum  actionsTypes {
    setOrder = "setOrder",
    ssetOrderToCart = "setOrderToCart",
    changeQuantityOrderType ='changeQuantityOrder',
    removeFromListFinalize="removeFromListFinalize",
    setFreteInOrderType="setFreteInOrder",
    resetOrderType="resetOrder"
}



export interface changeQuantOrder{
    idPrduct:Number,
    quant:Number
} 

export const initialState: Order = {
    items:[],
    valueItems:0,
    frete:0
}

const calcTotal = (list:Array<OrderItem>) =>{

       let total = 0 
       
       list.map((item)=>{

        total = total + (Number(item.quantity) * item.product.price);
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

   const obj:OrderItem = {...objTemp[0], quantity:changeQuant.quant}

   listOrderItem.splice(index, 0, obj);

  return listOrderItem;
}


export const removeFromListFinalize = createAction (
    actionsTypes.removeFromListFinalize,
    props<{payload:Number}>()
)


export const setOrder = createAction(
    actionsTypes.setOrder,
    props<{payload:Order}>()
)

export const changeQuantityOrderType = createAction(
    actionsTypes.changeQuantityOrderType,
    props<{payload:changeQuantOrder}>()
)

//set order list at the list order finalize
export const setOrderToCart = createAction(
    actionsTypes.ssetOrderToCart,
    props<{payload:CartOrders}>()
)

export const resetOrder = createAction(
    actionsTypes.resetOrderType)

export const setFreteInOrder = createAction(
    actionsTypes.setFreteInOrderType,
    props<{payload:number}>()
)

export const orderReducer = createReducer(
    initialState,
    on(setOrder, (state, {payload})=>{
        state = {...state, items:payload.items, valueItems:Number(calcTotal(payload.items)), frete:payload.frete}
        return state;
    }),
    on(changeQuantityOrderType,(state,{payload})=>{

        state = {...state, items:handlerChange(state.items,payload)}
        state = {...state, valueItems:Number(calcTotal(state.items))}
        return state;
    }),
    on(setOrderToCart, ( state, {payload})=>{
        state = {...state, items:payload.listOrderItem, valueItems:Number(calcTotal(payload.listOrderItem))}
        return state;
    }),

    on( removeFromListFinalize, (state, {payload})=>{
        state = {...state, items:state.items.filter((item)=>{
            return item.product.id !== payload;
        })}
        state = {...state, valueItems:Number(calcTotal(state.items))}
        return state;
    }),

    on(setFreteInOrder,(state, {payload})=>{
        state = {...state, frete:payload}
        return state;
    }) ,

    on(resetOrder,(state)=>{
        state = {...state, items:[], valueItems:0}
        return state;
    })
)