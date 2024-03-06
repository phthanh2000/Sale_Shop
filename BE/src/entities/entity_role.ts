import { Entity_Base } from './entity_base';

// Entity role
export interface Entity_Role extends Entity_Base {
    name: string,
}

// Column name in table role
export const Column_Role = {
    id: 'id',
    name: 'name',
    createdat: 'createdat',
    updatedat: 'updatedat'
}