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
exports.Model_CreateDB = void 0;
const connection_1 = require("../db/connection");
const constants_1 = require("../constants");
class Model_CreateDB {
}
exports.Model_CreateDB = Model_CreateDB;
_a = Model_CreateDB;
// Function to create a database
Model_CreateDB.createDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
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
Model_CreateDB.createTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connection_1.pool.connect();
    try {
        // Execute SQL command to create the table
        yield client.query(`  
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            
            CREATE TABLE "Categories" (
                "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                "name" VARCHAR(100) NOT NULL,
                "code" VARCHAR(10) NOT NULL UNIQUE,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP
            );

            CREATE TABLE "Products" (
                "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                "name" VARCHAR(100) NOT NULL,
                "price" NUMERIC,
                "quantity" INT,
                "description" VARCHAR,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
                "categoryid" UUID REFERENCES ${constants_1.CONST_TABLE_NAME.categories}(id)
            );
            
            CREATE TABLE "Users" (
                "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                "name" VARCHAR(100) NOT NULL,
                "pass" VARCHAR(50) NOT NULL,
                "email" VARCHAR(100) NOT NULL UNIQUE,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP
            );
            
            CREATE TABLE "Orders" (
                "id" BIGSERIAL PRIMARY KEY,
                "totalamount" NUMERIC,
                "date" TIMESTAMP,
                "userid" UUID REFERENCES ${constants_1.CONST_TABLE_NAME.users}(id) 
            );

            CREATE TABLE "OrderDetails" (
                "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                "quantity" INT,
                "subtotal" NUMERIC,
                "orderid" BIGINT REFERENCES ${constants_1.CONST_TABLE_NAME.orders}(id),
                "userid" UUID REFERENCES ${constants_1.CONST_TABLE_NAME.users}(id)
            );
        `);
    }
    finally {
        client.release();
    }
});
// Function to delete a table
Model_CreateDB.deleteTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connection_1.pool.connect();
    try {
        client.query(`
        DROP TABLE "Products";
        DROP TABLE "Categories";
        DROP TABLE "OrderDetails";
        DROP TABLE "Orders";
        DROP TABLE "Users";
        `);
    }
    finally {
        client.release();
    }
});
