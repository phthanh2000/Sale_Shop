import { newPool, pool } from '../db/connection';
import { CONST_COLUMN_ROLES, CONST_CONNECT_POSTGRES, CONST_TABLE_NAME } from '../constants';

export class Model_Database {

    // Function to create a database
    public static createDatabase = async () => {
        const client = await newPool.connect();
        try {
            // Execute SQL command to create the database
            await client.query(`CREATE DATABASE ${CONST_CONNECT_POSTGRES.database};`);
        } finally {
            client.release();
        }
    };

    // Function to create a table
    public static createTable = async () => {
        const client = await pool.connect();
        try {
            // Execute SQL command to create the table
            await client.query(`
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
                "code" VARCHAR NOT NULL UNIQUE,
                "price" NUMERIC NOT NULL,
                "quantity" INT NOT NULL,
                "description" VARCHAR,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
                "categoryid" BIGINT REFERENCES ${CONST_TABLE_NAME.Categories}(id)
            );

            CREATE TABLE "Images" (
                "id" BIGSERIAL PRIMARY KEY,
                "url" VARCHAR NOT NULL,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
                "productid" BIGINT REFERENCES ${CONST_TABLE_NAME.Products}(id)
            );

            CREATE TABLE "Roles" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(100) NOT NULL UNIQUE,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP
            );

            CREATE TABLE "Users" (
                "id" BIGSERIAL PRIMARY KEY,
                "name" VARCHAR(100) NOT NULL,
                "phone" INT NOT NULL,
                "pass" VARCHAR NOT NULL,
                "email" VARCHAR(100) NOT NULL UNIQUE,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
                "roleid" INT REFERENCES ${CONST_TABLE_NAME.Roles}(id)
            );
            
            CREATE TABLE "Orders" (
                "id" BIGSERIAL PRIMARY KEY,
                "totalamount" NUMERIC NOT NULL,
                "createdat" TIMESTAMP,
                "userid" BIGINT REFERENCES ${CONST_TABLE_NAME.Users}(id)
            );

            CREATE TABLE "OrderDetails" (
                "id" BIGSERIAL PRIMARY KEY,
                "quantity" INT NOT NULL,
                "size" VARCHAR NOT NULL,
                "subtotal" NUMERIC NOT NULL,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
                "orderid" BIGINT REFERENCES ${CONST_TABLE_NAME.Orders}(id),
                "userid" BIGINT REFERENCES ${CONST_TABLE_NAME.Users}(id)
            );

            CREATE TABLE "Tokens" (
                "token" VARCHAR NOT NULL,
                "createdat" TIMESTAMP,
                "userid" BIGINT REFERENCES ${CONST_TABLE_NAME.Users}(id)
            );
        `);
        } finally {
            client.release();
        }
    };

    // Function to insert default value for table
    public static insertDefaultValueForTable = async () => {
        const client = await pool.connect();
        try {
            // Execute SQL command to create the table
            await client.query(`
            INSERT INTO ${CONST_TABLE_NAME.Roles} (${CONST_COLUMN_ROLES.name}, ${CONST_COLUMN_ROLES.createdat}, ${CONST_COLUMN_ROLES.updatedat})
            VALUES ('admin', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                   ('user', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
        `);
        } finally {
            client.release();
        }
    };

    // Function to delete a table
    public static deleteTable = async () => {
        const client = await pool.connect();
        try {
            client.query(`
        DROP TABLE "Tokens";
        DROP TABLE "Images";
        DROP TABLE "Products";
        DROP TABLE "Categories";
        DROP TABLE "OrderDetails";
        DROP TABLE "Orders";
        DROP TABLE "Users";
        DROP TABLE "Roles";
        `);
        } finally {
            client.release();
        }
    };
}