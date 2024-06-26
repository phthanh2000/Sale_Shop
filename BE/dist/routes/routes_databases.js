"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_databases_1 = require("../controllers/controller_databases");
// Router create database
const router_database = (0, express_1.Router)();
router_database.get('/createDatabase', controller_databases_1.Controller_Databases.createDatabase);
router_database.get('/createTable', controller_databases_1.Controller_Databases.createTable);
router_database.get('/insertTable', controller_databases_1.Controller_Databases.insertDefaultValueForTable);
router_database.delete('/deleteTable', controller_databases_1.Controller_Databases.deleteTable);
exports.default = router_database;
