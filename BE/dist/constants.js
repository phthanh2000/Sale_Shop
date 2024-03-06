"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONST_TABLE_NAME = exports.CONST_CONNECT_POSTGRES = void 0;
// Constants postgres
exports.CONST_CONNECT_POSTGRES = {
    user: 'postgres',
    host: 'localhost',
    database: 'sale_shop',
    password: '123456',
    port: 5432,
};
// Constants table name
exports.CONST_TABLE_NAME = {
    categories: `public."Categories"`,
    products: `public."Products"`,
    users: `public."Users"`,
    orders: `public."Orders"`,
    orderDetails: `public."OrderDetails"`,
    userToken: `public."UserToken"`,
    roles: `public."Roles"`
};
