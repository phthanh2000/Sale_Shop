import { Entity_Base } from './entity_base';

// Entity product
export interface Entity_Product extends Entity_Base {
    name: string;
    code: string;
    image: string;
    price: number;
    quantity: number;
    description: string;
    categoryid: string;
}

// Column name in table product
export const Column_Product = {
    id: 'id',
    name: 'name',
    code: 'code',
    image: 'image',
    price: 'price',
    quantity: 'quantity',
    description: 'description',
    categoryid: 'categoryid',
    createdat: 'createdat',
    updatedat: 'updatedat'
}