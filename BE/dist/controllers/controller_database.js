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
exports.Controller_Database = void 0;
const model_database_1 = require("../models/model_database");
class Controller_Database {
}
exports.Controller_Database = Controller_Database;
_a = Controller_Database;
// Requires create new database
Controller_Database.createDatabase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_database_1.Model_Database.createDatabase();
        res.status(200).send(`Run createDatabase successfully !`);
    }
    catch (error) {
        res.status(400).send(`Error createDatabase: ${error}`);
    }
});
// Requires create new tables
Controller_Database.createTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_database_1.Model_Database.createTable();
        res.status(200).send(`Run createTable successfully !`);
    }
    catch (error) {
        res.status(400).send(`Error createTable: ${error}`);
    }
});
// Requires delete tables
Controller_Database.deleteTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_database_1.Model_Database.deleteTable();
        res.status(200).send(`Run deleteTable successfully !`);
    }
    catch (error) {
        res.status(400).send(`Error deleteTable: ${error}`);
    }
});
