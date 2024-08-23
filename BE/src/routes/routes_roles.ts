import { Router } from 'express';
import { Controller_Roles } from '../controllers/controller_roles';

// Router role
const router_role = Router();

router_role.get('/getRoles', Controller_Roles.getRoles);

export default router_role;

