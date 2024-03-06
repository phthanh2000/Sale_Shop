import { Router } from 'express';
import { Controller_Base } from '../controllers/controller_base';
import { Controller_User } from '../controllers/controller_user';

// Router user
const router_user = Router();

router_user.get('/getUsers', Controller_User.getUsers);
router_user.post('/login', Controller_User.userLogin);
router_user.post('/createUser', Controller_User.createUser);
router_user.put('/updateUser/:id', Controller_Base.authenticateToken, Controller_User.updateUser);
router_user.delete('/deleteUser/:id', Controller_Base.authenticateToken, Controller_User.deleteUser);

export default router_user;