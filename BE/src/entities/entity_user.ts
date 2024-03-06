import { Entity_Base } from './entity_base';

// Entity user
export interface Entity_User extends Entity_Base {
    name: string;
    email: string;
    pass: string;
    roleid: string;
}

// Column name in table user
export const Column_User = {
    id: 'id',
    name: 'name',
    email: 'email',
    pass: 'pass',
    createdat: 'createdat',
    updatedat: 'updatedat',
    roleid: 'roleid'
}