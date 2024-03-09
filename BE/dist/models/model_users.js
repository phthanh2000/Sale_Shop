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
exports.Model_User = void 0;
const connection_1 = require("../db/connection");
const constants_1 = require("../constants");
class Model_User {
}
exports.Model_User = Model_User;
_a = Model_User;
// Table name
Model_User.tableName = constants_1.CONST_TABLE_NAME.users;
// Function to get list user
Model_User.getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    // Connect postgres database
    const client = yield connection_1.pool.connect();
    try {
        // Data query
        let queryOptions = `SELECT * FROM ${_a.tableName} ORDER BY ${constants_1.CONST_COLUMN_USERS.createdat}`;
        // Perform data queries
        const result = yield client.query(queryOptions);
        return result.rows;
    }
    finally {
        // Release the connection
        client.release();
    }
});
// Function to create user
Model_User.createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Connect postgres database
    const client = yield connection_1.pool.connect();
    try {
        // Data
        const { name, email, pass } = user;
        // Data query
        const queryOptions = `INSERT INTO ${_a.tableName} 
                          (
                            ${constants_1.CONST_COLUMN_USERS.name}, 
                            ${constants_1.CONST_COLUMN_USERS.email}, 
                            ${constants_1.CONST_COLUMN_USERS.pass},
                            ${constants_1.CONST_COLUMN_USERS.createdat},
                            ${constants_1.CONST_COLUMN_USERS.updatedat}
                          ) VALUES ( $1, $2, $3, $4, $5 ) RETURNING *`;
        // Perform data queries
        const result = yield client.query(queryOptions, [name, email, pass, new Date(), new Date]);
        return result.rows[0];
    }
    finally {
        // Release the connection
        client.release();
    }
});
// Function to update user
Model_User.updateUser = (valueId, user) => __awaiter(void 0, void 0, void 0, function* () {
    // Connect postgres database
    const client = yield connection_1.pool.connect();
    try {
        // New data
        const { name, email, phone, pass } = user;
        // User id
        const id = valueId;
        // Data query
        const queryOptions = `UPDATE ${_a.tableName}
                            SET ${constants_1.CONST_COLUMN_USERS.name}= $1, 
                                ${constants_1.CONST_COLUMN_USERS.email}= $2,
                                ${constants_1.CONST_COLUMN_USERS.phone}= $3,
                                ${constants_1.CONST_COLUMN_USERS.pass}= $4,
                                ${constants_1.CONST_COLUMN_USERS.updatedat}= $5
                            WHERE ${constants_1.CONST_COLUMN_USERS.id}= $6 RETURNING *`;
        // Perform data queries
        const result = yield client.query(queryOptions, [name, email, phone, pass, new Date(), id]);
        return result.rows[0];
    }
    finally {
        // Release the connection
        client.release();
    }
});
// Function to delete user
Model_User.deleteUser = (valueId) => __awaiter(void 0, void 0, void 0, function* () {
    // Connect postgres database
    const client = yield connection_1.pool.connect();
    try {
        // User id
        const id = valueId;
        // Data query
        const queryOptions = `DELETE FROM ${_a.tableName}
                            WHERE ${constants_1.CONST_COLUMN_USERS.id} = $1 RETURNING *`;
        // Perform data queries
        const result = yield client.query(queryOptions, [id]);
        return result.rows[0];
    }
    finally {
        // Release the connection
        client.release();
    }
});
// Function check user is exists in list 
Model_User.checkUserIsExists = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Connect postgres database
    const client = yield connection_1.pool.connect();
    try {
        const { email } = user;
        const queryOptions = `SELECT *
                            FROM ${_a.tableName}
                            WHERE ${constants_1.CONST_COLUMN_USERS.email} = $1`;
        // Perform data queries
        const result = yield client.query(queryOptions, [email]);
        return result.rows[0];
    }
    finally {
        // Release the connection
        client.release();
    }
});
// Function to get user for email and password
Model_User.getUserForEmailAndPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Connect postgres database
    const client = yield connection_1.pool.connect();
    try {
        const { email, pass } = user;
        const queryOptions = `SELECT * FROM ${_a.tableName} 
                            WHERE ${constants_1.CONST_COLUMN_USERS.email} = $1
                            AND ${constants_1.CONST_COLUMN_USERS.pass} = $2`;
        // Perform data queries
        const result = yield client.query(queryOptions, [email, pass]);
        return result.rows[0];
    }
    finally {
        // Release the connection
        client.release();
    }
});
