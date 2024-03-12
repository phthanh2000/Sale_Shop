"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_base_1 = require("../controllers/controller_base");
const controller_users_1 = require("../controllers/controller_users");
// Router user
const router_user = (0, express_1.Router)();
router_user.get('/getUsers', controller_users_1.Controller_Users.getUsers);
router_user.post('/login', controller_users_1.Controller_Users.userLogin);
router_user.post('/createUser', controller_users_1.Controller_Users.createUser);
router_user.put('/updateUser/:id', controller_base_1.Controller_Base.authenticateToken, controller_users_1.Controller_Users.updateUser);
router_user.delete('/deleteUser/:id', controller_base_1.Controller_Base.authenticateToken, controller_users_1.Controller_Users.deleteUser);
router_user.get('/resetPasswordUser', controller_base_1.Controller_Base.sendMailToResetPassword);
exports.default = router_user;
