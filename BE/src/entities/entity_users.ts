import { Entity_Base } from './entity_base';

// Entity users
export interface Entity_Users extends Entity_Base {
    name?: string;
    email?: string;
    phone?: number;
    pass?: string;
    resetpass?: boolean;
    roleid?: string;
}