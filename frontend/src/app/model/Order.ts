import { OrderItem } from "./OrderItem";

export interface Order {
    id?:number,
    listOrderItem:Array<OrderItem>,
    total:Number
}