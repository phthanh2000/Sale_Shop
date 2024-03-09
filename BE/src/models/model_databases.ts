import { newPool, pool } from '../db/connection';
import { CONST_CONNECT_POSTGRES, CONST_TABLE_NAME } from '../constants';

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
                "code" VARCHAR NOT NULL UNIQUE
                "price" NUMERIC,
                "quantity" INT,
                "description" VARCHAR,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
                "categoryid" BIGINT REFERENCES ${CONST_TABLE_NAME.categories}(id)
            );

            CREATE TABLE "Images" (
                "id" BIGSERIAL PRIMARY KEY,
                "url" VARCHARL,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
                "productid" BIGINT REFERENCES ${CONST_TABLE_NAME.products}(id)
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
                "roleid" INT REFERENCES ${CONST_TABLE_NAME.roles}(id)
            );
            
            CREATE TABLE "Orders" (
                "id" BIGSERIAL PRIMARY KEY,
                "totalamount" NUMERIC,
                "createdat" TIMESTAMP,
                "userid" BIGINT REFERENCES ${CONST_TABLE_NAME.users}(id) 
            );

            CREATE TABLE "OrderDetails" (
                "id" BIGSERIAL PRIMARY KEY,
                "quantity" INT,
                "size" VARCHAR,
                "subtotal" NUMERIC,
                "createdat" TIMESTAMP,
                "updatedat" TIMESTAMP,
                "orderid" BIGINT REFERENCES ${CONST_TABLE_NAME.orders}(id),
                "userid" BIGINT REFERENCES ${CONST_TABLE_NAME.users}(id)
            );

            CREATE TABLE "Tokens" (
                "token" VARCHAR NOT NULL,
                "createdat" TIMESTAMP,
                "userid" BIGINT REFERENCES ${CONST_TABLE_NAME.users}(id)
            );
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
        DROP TABLE "Token";
        DROP TABLE "Images";
        DROP TABLE "Products";
        DROP TABLE "Categories";
        DROP TABLE "OrderDetails";
        DROP TABLE "Orders";
        DROP TABLE "Roles";
        DROP TABLE "Users";
        `);
        } finally {
            client.release();
        }
    };
}