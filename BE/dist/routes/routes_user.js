"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_user_1 = require("../controllers/controller_user");
const router_user = (0, express_1.Router)();
router_user.get('/getAllUsers', controller_user_1.Controller_User.getAllUsers);
router_user.post('/createUser', controller_user_1.Controller_User.createUser);
router_user.put('/updateUser', controller_user_1.Controller_User.updateUser);
exports.default = router_user;
