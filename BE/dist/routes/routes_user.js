"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_base_1 = require("../controllers/controller_base");
const controller_user_1 = require("../controllers/controller_user");
// Router user
const router_user = (0, express_1.Router)();
router_user.get('/getUsers', controller_user_1.Controller_User.getUsers);
router_user.post('/login', controller_user_1.Controller_User.userLogin);
router_user.post('/createUser', controller_user_1.Controller_User.createUser);
router_user.put('/updateUser/:id', controller_base_1.Controller_Base.authenticateToken, controller_user_1.Controller_User.updateUser);
router_user.delete('/deleteUser/:id', controller_base_1.Controller_Base.authenticateToken, controller_user_1.Controller_User.deleteUser);
exports.default = router_user;
