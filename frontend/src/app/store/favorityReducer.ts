import { createReducer, createAction, on, props } from "@ngrx/store";
import { Product } from "../model/Product";

enum actionsTypes{
    addFavoriteType="addFavorite",
    removeFavorityType="removeFavorite",
    setItensInFavoritesType="setProductsInFavorites"
}

export interface FavoriteModel{
    products:Array<Product>
}

export const initialState:FavoriteModel={
    products:[]
}

const verifyIfAlreadyExists = (product:Product,products:Array<Product>)=>{ 
    return products.filter( item => item.id === product.id ).length == 1 ? true : false;
 }

export const addFavorite = createAction(
    actionsTypes.addFavoriteType,
    props<{payload:Product}>()
)

export const removeFavorite = createAction(
    actionsTypes.removeFavorityType,
    props<{payload:number}>()
)

export const setItensInFavorites = createAction(
    actionsTypes.setItensInFavoritesType,
    props<{payload:Array<Product>}>()
)


export const favoriteReducer = createReducer(
    initialState,
    on(addFavorite,(state,{payload})=>{
        if(!verifyIfAlreadyExists(payload, state.products)){

            let list:Array<Product> = [];
            list = [...list, ...state.products]
            list.push(payload) 
            state = {...state, products:list}
        }
        return state;
    }),
    on(removeFavorite, (state, {payload})=>{
        state = {...state, products:state.products.filter( item => item.id !== payload)}
        return state;
    }),

    on( setItensInFavorites,(state, {payload})=>{
        state = {...state, products:payload}
        return state;
    } )
)

