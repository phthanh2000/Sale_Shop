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
Model_User.tableName = constants_1.CONST_TABLE_NAME.Users;
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
        const { name, email, phone, pass, roleid } = user;
        // new Date
        const newDate = new Date().toISOString();
        // Data query
        const queryOptions = `INSERT INTO ${_a.tableName} 
                          (
                            ${constants_1.CONST_COLUMN_USERS.name}, 
                            ${constants_1.CONST_COLUMN_USERS.email},
                            ${constants_1.CONST_COLUMN_USERS.phone}, 
                            ${constants_1.CONST_COLUMN_USERS.pass},
                            ${constants_1.CONST_COLUMN_USERS.resetpass},
                            ${constants_1.CONST_COLUMN_USERS.createdat},
                            ${constants_1.CONST_COLUMN_USERS.updatedat},
                            ${constants_1.CONST_COLUMN_USERS.roleid}
                          ) VALUES ( '${name}', '${email}', '${phone}', '${pass}', ${false}, '${newDate}', '${newDate}', ${roleid} ) RETURNING *`;
        // Perform data queries
        const result = yield client.query(queryOptions);
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
        const { name, email, address, phone, pass, resetpass, roleid } = user;
        // User id
        const id = valueId;
        // new Date
        const newDate = new Date().toISOString();
        // Data query
        let queryOptions = `UPDATE ${_a.tableName} SET `;
        if (name !== undefined) {
            queryOptions += `${constants_1.CONST_COLUMN_USERS.name}= '${name}', `;
        }
        if (email !== undefined) {
            queryOptions += `${constants_1.CONST_COLUMN_USERS.email}= '${email}', `;
        }
        if (address !== undefined) {
            queryOptions += `${constants_1.CONST_COLUMN_USERS.address}= '${address}', `;
        }
        if (phone !== undefined) {
            queryOptions += `${constants_1.CONST_COLUMN_USERS.phone}= '${phone}', `;
        }
        if (pass !== undefined) {
            queryOptions += `${constants_1.CONST_COLUMN_USERS.pass}= '${pass}', `;
        }
        if (resetpass !== undefined) {
            queryOptions += `${constants_1.CONST_COLUMN_USERS.resetpass}= ${resetpass}, `;
        }
        if (roleid !== undefined) {
            queryOptions += `${constants_1.CONST_COLUMN_USERS.roleid} = ${roleid},`;
        }
        queryOptions += `${constants_1.CONST_COLUMN_USERS.updatedat}= '${newDate}' WHERE ${constants_1.CONST_COLUMN_USERS.id}= ${id} RETURNING *`;
        // Perform data queries
        const result = yield client.query(queryOptions);
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
                            WHERE ${constants_1.CONST_COLUMN_USERS.id} = ${id} RETURNING *`;
        // Perform data queries
        const result = yield client.query(queryOptions);
        return result.rows[0];
    }
    finally {
        // Release the connection
        client.release();
    }
});
// Function check email exists
Model_User.checkEmailExists = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Connect postgres database
    const client = yield connection_1.pool.connect();
    try {
        // Email
        const { email } = user;
        // Data query
        const queryOptions = `SELECT *
                            FROM ${_a.tableName}
                            WHERE ${constants_1.CONST_COLUMN_USERS.email} = '${email}'`;
        // Perform data queries
        const result = yield client.query(queryOptions);
        return result.rows[0];
    }
    finally {
        // Release the connection
        client.release();
    }
});
// Function check user for id
Model_User.checkUserForId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Connect postgres database
    const client = yield connection_1.pool.connect();
    try {
        // Data query
        const queryOptions = `SELECT *
                            FROM ${_a.tableName}
                            WHERE ${constants_1.CONST_COLUMN_USERS.id}= ${id}`;
        // Perform data queries             
        const result = yield client.query(queryOptions);
        return result.rows[0];
    }
    finally {
        // Release the connection
        client.release();
    }
});
// Function check phone is registered with another user
Model_User.checkPhoneRegisteredWithAnotherUser = (id, phone) => __awaiter(void 0, void 0, void 0, function* () {
    // Connect postgres database
    const client = yield connection_1.pool.connect();
    try {
        // Data query
        const queryOptions = `SELECT COUNT(*)
                            FROM ${constants_1.CONST_TABLE_NAME.Users}
                            WHERE ${constants_1.CONST_COLUMN_USERS.phone} = '${phone}' 
                            AND ${constants_1.CONST_COLUMN_USERS.id} != ${id}`;
        // Perform data queries             
        const result = yield client.query(queryOptions);
        return result.rows[0].count;
    }
    finally {
        // Release the connection
        client.release();
    }
});
// Function check email exists with another user
Model_User.checkEmailExistsWithAnthorUser = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    // Connect postgres database
    const client = yield connection_1.pool.connect();
    try {
        // Data query
        const queryOptions = `SELECT COUNT(*)
                            FROM ${_a.tableName}
                            WHERE ${constants_1.CONST_COLUMN_USERS.email} = '${email}'
                            AND ${constants_1.CONST_COLUMN_USERS.id} != ${id}`;
        // Perform data queries
        const result = yield client.query(queryOptions);
        return result.rows[0].count;
    }
    finally {
        // Release the connection
        client.release();
    }
});
