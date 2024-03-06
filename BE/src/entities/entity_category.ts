import { Entity_Base } from './entity_base';

// Entity category
export interface Entity_Category extends Entity_Base {
    name: string;
    code: string;
}

// Column name in table category
export const Column_Category = {
    id: 'id',
    name: 'name',
    code: 'code',
    createdat: 'createdat',
    updatedat: 'updatedat'
}