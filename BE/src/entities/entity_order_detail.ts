import { Entity_Base } from './entity_base';

// Entity order detail
export interface Entity_Order_Detail extends Entity_Base {
    quantity: number;
    subtotal: number;
    orderid: number;
    userid: number;

}

// Column name in table order detail
export const Column_Order_Detail = {
    id: 'id',
    quantity: 'quantity',
    subtotal: 'subtotal',
    createdat: 'createdat',
    updatedat: 'updatedat',
    orderid: 'orderid',
    userid: 'userid',
}