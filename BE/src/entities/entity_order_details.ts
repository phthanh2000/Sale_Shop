import { Entity_Base } from './entity_base';

// Entity order details
export interface Entity_Order_Details extends Entity_Base {
    quantity: number;
    size: string;
    subtotal: number;
    orderid: number;
    userid: number;
}