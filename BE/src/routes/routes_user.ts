import { Router } from 'express';
import { Controller_User } from '../controllers/controller_user';

const router_user = Router();

router_user.get('/getUsers', Controller_User.getUsers);
router_user.post('/createUser', Controller_User.createUser);
router_user.put('/updateUser', Controller_User.updateUser);
router_user.delete('/deleteUser/:id', Controller_User.deleteUser);
router_user.get('/getUserToken',Controller_User.getUserToken);

export default router_user;