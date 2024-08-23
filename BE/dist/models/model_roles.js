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
exports.Model_Roles = void 0;
const connection_1 = require("../db/connection");
const constants_1 = require("../constants");
class Model_Roles {
}
exports.Model_Roles = Model_Roles;
_a = Model_Roles;
// Table name
Model_Roles.tableName = constants_1.CONST_TABLE_NAME.Roles;
// Function to get list role
Model_Roles.getRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    // Connect postgres database
    const client = yield connection_1.pool.connect();
    try {
        // Data query
        let queryOptions = `SELECT * FROM ${_a.tableName}`;
        // Perform data queries
        const result = yield client.query(queryOptions);
        return result.rows;
    }
    finally {
        // Release the connection
        client.release();
    }
});
