import { createReducer, createAction, on, props } from "@ngrx/store";
import { CartOrders } from "../model/CartOrders";
import { OrderItem } from "../model/OrderItem";

enum actionsTypes {
    addOnCartType="addOnCart",
    removeOnCartType='removeOnCard',
    changeQuantityType = 'changeQuantity',
    setProductsInCartType = "setProductsInCart",
    resetCartType="resetCart"
}

export interface changeQuant{
    idPrduct:number,
    quant:number
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

    let total = 0;

    list.map((item)=>{
     total = total + ((item.quantity.valueOf()) * item.product.price);
 })

 return total;
}

// change quantity at a object orderItem
const handlerChange = (listOrderItem:Array<OrderItem>,changeQuant:changeQuant) =>{
    
    let objTemp = listOrderItem.filter((item)=>{//extract item to change at the list
        return item.product.id === changeQuant.idPrduct
    })

    const index = listOrderItem.indexOf(objTemp[0]);// cathing index at the item

    listOrderItem = listOrderItem.filter((item)=>{//remove item to change at the list
        return item.product.id !== changeQuant.idPrduct;
    })

   const obj:OrderItem = {...objTemp[0], quantity:changeQuant.quant}//build item with new quantity 

   listOrderItem.splice(index, 0, obj);// adding item changed in list again

  return listOrderItem;
}

export const addOnCart = createAction (
    actionsTypes.addOnCartType,
    props<{payload:OrderItem}>()
)

export const removeOntCart = createAction (
    actionsTypes.removeOnCartType,
    props<{payload:number}>()
)

export const changeQuantity = createAction(
    actionsTypes.changeQuantityType,
    props<{payload:changeQuant}>()
)

export const setProductsInCart = createAction (
    actionsTypes.setProductsInCartType,
    props<{payload:Array<OrderItem>}>()
)

export const resetCart = createAction(
    actionsTypes.resetCartType
)


export const cartReducer = createReducer(
    initialState,
    on(addOnCart,(state, {payload})=>{
        //Verify if product already in listOrdem
            if(!verifyIfAlreadyExists(payload,state.listOrderItem)){
            let list:Array<OrderItem> = [];
            list = [...list, ...state.listOrderItem]
            list.push(payload) 
            state = {...state, listOrderItem:list}
            state = {...state, total:(calcTotal(state.listOrderItem))}
        }
        

        return state;
    }),

    //Remove product at the cart
    on(removeOntCart,(state,{payload})=>{
        state = {...state, listOrderItem:state.listOrderItem.filter((item)=>{ 
            return item.product.id !== payload;
        })}
        state = {...state, total:(calcTotal(state.listOrderItem))}
        return state;
    }),

    on(changeQuantity,(state,{payload})=>{

        state = {...state, listOrderItem:handlerChange(state.listOrderItem,payload)}
        state = {...state, total:(calcTotal(state.listOrderItem))}
        return state;
    }),

    on( setProductsInCart, (state, {payload})=>{
        state = {...state, listOrderItem:payload, total:(calcTotal(payload))}
        return state;
    }),
    on(resetCart,(state)=>{
        state = {...state, listOrderItem:[],total:0}
        return state;
    })
)