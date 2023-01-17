import { createReducer, createAction, on, props } from "@ngrx/store";
import { AuthModel } from "../model/authModel";

enum actionsTypes{
    setAuthType="setAuth",
    clearAuthType="" 
}

export const initialState:AuthModel = JSON.parse( String(localStorage.getItem('auth'))) as AuthModel || new AuthModel

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
        localStorage.clear()
        state = {...state, name:'', lastname:'', token:''};
        return state;
    })
)