import { createAction, createReducer, on, props } from "@ngrx/store";


enum actionTypes{
    onLoadingType = "onLoading",
    offLoadingType = "offLoading"
}

export const initialState:Boolean = false;


export const onLoading = createAction(
    actionTypes.onLoadingType
)

export const offLoading = createAction(
    actionTypes.offLoadingType
)

export const loadingReducer = createReducer(
    initialState,
    on(onLoading,(state)=> state=true),
    on(offLoading,(state)=>state=false)
)