import { Router } from 'express';
import { Controller_Base } from '../controllers/controller_base';
import { Controller_Users } from '../controllers/controller_users';

// Router user
const router_user = Router();

router_user.get('/getUsers', Controller_Users.getUsers);
router_user.post('/login', Controller_Users.userLogin);
router_user.post('/createUser', Controller_Users.createUser);
router_user.put('/updateUser/:id', Controller_Base.authenticateToken, Controller_Users.updateUser);
router_user.delete('/deleteUser/:id', Controller_Base.authenticateToken, Controller_Users.deleteUser);

export default router_user;