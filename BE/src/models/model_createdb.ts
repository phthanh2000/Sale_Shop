import { newPool, pool } from '../db/connection';
import { CONST_CONNECT_POSTGRES, CONST_TABLE_NAME } from '../constants';

export class Model_CreateDB {

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
                "categoryid" UUID REFERENCES ${CONST_TABLE_NAME.categories}(id)
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
                "userid" UUID REFERENCES ${CONST_TABLE_NAME.users}(id) 
            );

            CREATE TABLE "OrderDetails" (
                "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                "quantity" INT,
                "subtotal" NUMERIC,
                "orderid" BIGINT REFERENCES ${CONST_TABLE_NAME.orders}(id),
                "userid" UUID REFERENCES ${CONST_TABLE_NAME.users}(id)
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
        DROP TABLE "Products";
        DROP TABLE "Categories";
        DROP TABLE "OrderDetails";
        DROP TABLE "Orders";
        DROP TABLE "Users";
        `);
    } finally {
        client.release();
    }
    };
}