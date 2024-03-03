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
exports.Controller_CreateDB = void 0;
const model_createdb_1 = require("../models/model_createdb");
class Controller_CreateDB {
}
exports.Controller_CreateDB = Controller_CreateDB;
_a = Controller_CreateDB;
Controller_CreateDB.createDatabase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_createdb_1.Model_CreateDB.createDatabase();
        res.status(200).send(`Run createDatabase successfully !`);
    }
    catch (error) {
        res.status(400).send(`Error createDatabase: ${error}`);
    }
});
Controller_CreateDB.createTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_createdb_1.Model_CreateDB.createTable();
        res.status(200).send(`Run createTable successfully !`);
    }
    catch (error) {
        res.status(400).send(`Error createTable: ${error}`);
    }
});
Controller_CreateDB.deleteTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_createdb_1.Model_CreateDB.deleteTable();
        res.status(200).send(`Run deleteTable successfully !`);
    }
    catch (error) {
        res.status(400).send(`Error deleteTable: ${error}`);
    }
});
