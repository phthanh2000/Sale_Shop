import { Entity_Base } from './entity_base';

// Entity users
export interface Entity_Users extends Entity_Base {
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
    pass?: string;
    resetpass?: boolean;
    roleid?: string;
}