import { Entity_Base } from './entity_base';

// Entity orders
export interface Entity_Orders extends Entity_Base {
    totalamount: string;
    userid: string;
}