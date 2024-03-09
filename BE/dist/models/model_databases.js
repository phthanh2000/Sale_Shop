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
exports.Model_Database = void 0;
const connection_1 = require("../db/connection");
const constants_1 = require("../constants");
class Model_Database {
}
exports.Model_Database = Model_Database;
_a = Model_Database;
// Function to create a database
Model_Database.createDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connection_1.newPool.connect();
    try {
        // Execute SQL command to create the database
        yield client.query(`CREATE DATABASE ${constants_1.CONST_CONNECT_POSTGRES.database};`);
    }
    finally {
        client.release();
    }
});
// Function to create a table
Model_Database.createTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connection_1.pool.connect();
    try {
        // Execute SQL command to create the table
        yield client.query(`
            CREATE TABLE "Categories" (
                "id" BIGSERIAL PRIMARY KEY,
                "name" VARCHAR(100) NOT NULL,
                "code" VARCHAR(10) NOT NULL UNIQUE,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP
            );

            CREATE TABLE "Products" (
                "id" BIGSERIAL PRIMARY KEY,
                "name" VARCHAR(100) NOT NULL,
                "code" VARCHAR NOT NULL UNIQUE
                "price" NUMERIC,
                "quantity" INT,
                "description" VARCHAR,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
                "categoryid" BIGINT REFERENCES ${constants_1.CONST_TABLE_NAME.categories}(id)
            );

            CREATE TABLE "Images" (
                "id" BIGSERIAL PRIMARY KEY,
                "url" VARCHARL,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
                "productid" BIGINT REFERENCES ${constants_1.CONST_TABLE_NAME.products}(id)
            )

            CREATE TABLE "Roles" (
                "id" SERIAL PRIMARY KEY, 
                "name" VARCHAR(100) NOT NULL,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
            )

            CREATE TABLE "Users" (
                "id" BIGSERIAL PRIMARY KEY,
                "name" VARCHAR(100) NOT NULL,
                "phone" INT NOT NULL,
                "pass" VARCHAR(50) NOT NULL,
                "email" VARCHAR(100) NOT NULL UNIQUE,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
                "roleid" INT REFERENCES ${constants_1.CONST_TABLE_NAME.roles}(id)
            );
            
            CREATE TABLE "Orders" (
                "id" BIGSERIAL PRIMARY KEY,
                "totalamount" NUMERIC,
                "createdat" TIMESTAMP,
                "userid" BIGINT REFERENCES ${constants_1.CONST_TABLE_NAME.users}(id) 
            );

            CREATE TABLE "OrderDetails" (
                "id" BIGSERIAL PRIMARY KEY,
                "quantity" INT,
                "size" VARCHAR,
                "subtotal" NUMERIC,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
                "orderid" BIGINT REFERENCES ${constants_1.CONST_TABLE_NAME.orders}(id),
                "userid" BIGINT REFERENCES ${constants_1.CONST_TABLE_NAME.users}(id)
            );

            CREATE TABLE "Tokens" (
                "token" VARCHAR NOT NULL,
                "createdat" TIMESTAMP,
                "userid" BIGINT REFERENCES ${constants_1.CONST_TABLE_NAME.users}(id)
            );
        `);
    }
    finally {
        client.release();
    }
});
// Function to delete a table
Model_Database.deleteTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connection_1.pool.connect();
    try {
        client.query(`
        DROP TABLE "Token";
        DROP TABLE "Images";
        DROP TABLE "Products";
        DROP TABLE "Categories";
        DROP TABLE "OrderDetails";
        DROP TABLE "Orders";
        DROP TABLE "Roles";
        DROP TABLE "Users";
        `);
    }
    finally {
        client.release();
    }
});
