import { Router } from 'express';
import { Controller_Base } from '../controllers/controller_base';
import { Controller_Users } from '../controllers/controller_users';

// Router user
const router_user = Router();

router_user.get('/getUsers', Controller_Users.getUsers);
router_user.post('/getUserInfo', Controller_Users.getUserInfo);
router_user.post('/login', Controller_Users.userLogin);
router_user.post('/registerUser', Controller_Users.createUser);
router_user.put('/editUser/:id', Controller_Base.authenticateToken, Controller_Users.updateUser);
router_user.put('/editPasswordUser/:id', Controller_Base.authenticateToken, Controller_Users.updatePassswordUser);
router_user.delete('/deleteUser/:id', Controller_Base.authenticateToken, Controller_Users.deleteUser);
router_user.post('/deleteMultipleUsers',Controller_Base.authenticateToken, Controller_Users.deleteMultipleUsers);
router_user.post('/forgetPasswordUser', Controller_Users.forgetPasswordUser);
router_user.post('/checkTokenExpired', Controller_Users.checkTokenExpired);
router_user.post('/checkStatusResetPasswordOfUser', Controller_Users.checkStatusResetPasswordOfUser);
router_user.post('/resetPasswordUser', Controller_Users.resetPasswordUser);
export default router_user;