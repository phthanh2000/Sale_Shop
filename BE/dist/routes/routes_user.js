"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_user_1 = require("../controllers/controller_user");
const router_user = (0, express_1.Router)();
router_user.get('/getUsers', controller_user_1.Controller_User.getUsers);
router_user.post('/createUser', controller_user_1.Controller_User.createUser);
router_user.put('/updateUser', controller_user_1.Controller_User.updateUser);
router_user.delete('/deleteUser/:id', controller_user_1.Controller_User.deleteUser);
router_user.get('/checkUser', controller_user_1.Controller_User.checkUser);
exports.default = router_user;
