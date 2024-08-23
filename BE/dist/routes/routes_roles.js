"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_roles_1 = require("../controllers/controller_roles");
// Router role
const router_role = (0, express_1.Router)();
router_role.get('/getRoles', controller_roles_1.Controller_Roles.getRoles);
exports.default = router_role;
