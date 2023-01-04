import { OrderItem } from "./OrderItem";

export interface CartOrders {
    listOrderItem:Array<OrderItem>;
    total:number
} 