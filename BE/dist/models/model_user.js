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
const entity_user_1 = require("../entities/entity_user");
class Model_User {
}
exports.Model_User = Model_User;
_a = Model_User;
Model_User.tableName = `public."Users"`;
Model_User.getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connection_1.pool.connect();
    try {
        let queryOptions = `SELECT * FROM ${_a.tableName} ORDER BY ${entity_user_1.Column_User.id}`;
        const result = yield client.query(queryOptions);
        return result.rows;
    }
    finally {
        client.release();
    }
});
Model_User.createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connection_1.pool.connect();
    try {
        const { name, email, pass } = user;
        const queryOptions = `INSERT INTO ${_a.tableName} 
                          (
                            ${entity_user_1.Column_User.name}, 
                            ${entity_user_1.Column_User.email}, 
                            ${entity_user_1.Column_User.pass}
                          ) VALUES ( $1, $2, $3 ) RETURNING *`;
        const result = yield client.query(queryOptions, [name, email, pass]);
        return result.rows[0];
    }
    finally {
        client.release();
    }
});
Model_User.updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connection_1.pool.connect();
    try {
        const { name, email, pass } = user;
        const queryOptions = `UPDATE ${_a.tableName}
                            SET ${entity_user_1.Column_User.name}= $1, 
                                ${entity_user_1.Column_User.email}= $2,
                                ${entity_user_1.Column_User.pass}= $3,
                                ${entity_user_1.Column_User.updatedAt}= $4 
                            WHERE ${entity_user_1.Column_User.email}= $5 RETURNING *`;
        const result = yield client.query(queryOptions, [name, email, pass, , new Date(), email]);
        return result.rows[0];
    }
    finally {
        client.release();
    }
});
Model_User.deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connection_1.pool.connect();
    try {
        const queryOptions = `DELETE FROM ${_a.tableName}
                            WHERE ${entity_user_1.Column_User.id} = $1 RETURNING *`;
        const result = yield client.query(queryOptions, [id]);
        return result.rows[0];
    }
    finally {
        client.release();
    }
});
