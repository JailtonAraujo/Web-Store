import { createAction, createReducer, props, on  } from "@ngrx/store"; 
import { Order } from "../model/order";

enum  actionsTypes {
    setOrder = "setOrder"
}

export const initialState: Order = {
    listProduct:[]
}


export const setOrder = createAction(
    actionsTypes.setOrder,
    props<{payload:[]}>()
)


export const orderReducer = createReducer(
    initialState,
    on(setOrder, (state, {payload})=>{
        state = {...state, listProduct:payload }
        return state;
    })
)