import { createReducer, createAction, on, props } from "@ngrx/store";
import { AuthModel } from "../model/authModel";

enum actionsTypes{
    setAuthType="setAuth",
    clearAuthType="" 
}

export const initialState:AuthModel = JSON.parse( JSON.stringify(localStorage.getItem('auth')));

export const setAuth = createAction(
    actionsTypes.setAuthType,
    props<{payload:AuthModel}>()
)

export const clearAuth = createAction(
    actionsTypes.clearAuthType
)

export const authReducer = createReducer(
    initialState,
    on(setAuth, (state, {payload})=>{
        state = {...state, ...payload};
        localStorage.setItem('auth',JSON.stringify(payload));
        return state;
    }),
    on( clearAuth, (state)=>{
        state = {...state, ...{}};
        localStorage.clear();
        return state;
    })
)