"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_createdb_1 = require("../controllers/controller_createdb");
const router_createdb = (0, express_1.Router)();
router_createdb.post('/createDatabase', controller_createdb_1.Controller_CreateDB.createDatabase);
router_createdb.post('/createTable', controller_createdb_1.Controller_CreateDB.createTable);
router_createdb.delete('/deleteTable', controller_createdb_1.Controller_CreateDB.deleteTable);
exports.default = router_createdb;
