import { Entity_Base } from './entity_base';

// Entity product
export interface Entity_Products extends Entity_Base {
    name: string;
    code: string;
    image: string;
    price: number;
    quantity: number;
    description: string;
    categoryid: string;
}