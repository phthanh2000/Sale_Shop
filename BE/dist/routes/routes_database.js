"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_database_1 = require("../controllers/controller_database");
// Router create database
const router_database = (0, express_1.Router)();
router_database.post('/createDatabase', controller_database_1.Controller_Database.createDatabase);
router_database.post('/createTable', controller_database_1.Controller_Database.createTable);
router_database.delete('/deleteTable', controller_database_1.Controller_Database.deleteTable);
exports.default = router_database;
