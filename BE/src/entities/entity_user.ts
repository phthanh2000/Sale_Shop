import { Entity_Base } from './entity_base';

export interface Entity_User extends Entity_Base {
    name: string;
    email: string;
    pass: string;
}

export const Column_User = {
    id: 'id',
    name: 'name',
    email: 'email',
    pass: 'pass',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
}
