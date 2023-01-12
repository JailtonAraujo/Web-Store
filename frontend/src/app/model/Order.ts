import { OrderItem } from "./OrderItem";

export interface Order {
    id?:number,
    items:Array<OrderItem>,
    valueItems:number,
    frete:number,
    date?:string
}