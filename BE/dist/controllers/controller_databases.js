"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller_Databases = void 0;
const model_databases_1 = require("../models/model_databases");
class Controller_Databases {
}
exports.Controller_Databases = Controller_Databases;
_a = Controller_Databases;
// Requires create new database
Controller_Databases.createDatabase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_databases_1.Model_Database.createDatabase();
        res.status(200).send(`Run createDatabase successfully !`);
    }
    catch (error) {
        res.status(400).send(`Error createDatabase: ${error}`);
    }
});
// Requires create new tables
Controller_Databases.createTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_databases_1.Model_Database.createTable();
        res.status(200).send(`Run createTable successfully !`);
    }
    catch (error) {
        res.status(400).send(`Error createTable: ${error}`);
    }
});
// Requires insert default value into tables
Controller_Databases.insertDefaultValueForTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_databases_1.Model_Database.insertDefaultValueForTable();
        return res.status(200).send(`Run insertDefaulValueForTable successfully !`);
    }
    catch (error) {
        res.status(400).send(`Error insertDefaulValueForTable: ${error}`);
    }
});
// Requires delete tables
Controller_Databases.deleteTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_databases_1.Model_Database.deleteTable();
        res.status(200).send(`Run deleteTable successfully !`);
    }
    catch (error) {
        res.status(400).send(`Error deleteTable: ${error}`);
    }
});
