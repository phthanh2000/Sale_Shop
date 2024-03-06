import { Entity_Base } from './entity_base';

// Entity order
export interface Entity_Order extends Entity_Base {
    totalamount: string;
    userid: string;
}

// Column name in table order
export const Column_Order = {
    id: 'id',
    totalamount: 'totalamount',
    createdat: 'createdat',
    userid: 'userid',
}