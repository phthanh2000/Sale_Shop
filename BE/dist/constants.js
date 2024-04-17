"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONST_COLUMN_TOKENS = exports.CONST_COLUMN_ORDER_DETAILS = exports.CONST_COLUMN_ORDERS = exports.CONST_COLUMN_USERS = exports.CONST_COLUMN_ROLES = exports.CONST_COLUMN_IMAGES = exports.CONST_COLUMN_PRODUCTS = exports.CONST_COLUMN_CATEGORIES = exports.CONST_TABLE_NAME = exports.CONST_CONNECT_POSTGRES = void 0;
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
    Categories: `public."Categories"`,
    Products: `public."Products"`,
    Images: `public."Images"`,
    Users: `public."Users"`,
    Orders: `public."Orders"`,
    OrderDetails: `public."OrderDetails"`,
    Tokens: `public."Tokens"`,
    Roles: `public."Roles"`
};
// Constants column in table categories
exports.CONST_COLUMN_CATEGORIES = {
    id: 'id',
    name: 'name',
    code: 'code',
    createdat: 'createdat',
    updatedat: 'updatedat'
};
// Constants column in table products
exports.CONST_COLUMN_PRODUCTS = {
    id: 'id',
    name: 'name',
    code: 'code',
    image: 'image',
    price: 'price',
    quantity: 'quantity',
    description: 'description',
    categoryid: 'categoryid',
    createdat: 'createdat',
    updatedat: 'updatedat'
};
// Constants column in table images
exports.CONST_COLUMN_IMAGES = {
    id: 'id',
    url: 'url',
    createdat: 'createdat',
    updateddat: 'updatedat',
    productid: 'productid'
};
// Constants column in table roles
exports.CONST_COLUMN_ROLES = {
    id: 'id',
    name: 'name',
    createdat: 'createdat',
    updatedat: 'updatedat'
};
// Constants column in table users
exports.CONST_COLUMN_USERS = {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    pass: 'pass',
    resetpass: 'resetpass',
    createdat: 'createdat',
    updatedat: 'updatedat',
    roleid: 'roleid'
};
// Constants column in table orders
exports.CONST_COLUMN_ORDERS = {
    id: 'id',
    totalamount: 'totalamount',
    status: 'status',
    createdat: 'createdat',
    userid: 'userid',
};
// Constants column in table order details
exports.CONST_COLUMN_ORDER_DETAILS = {
    id: 'id',
    quantity: 'quantity',
    size: 'size',
    subtotal: 'subtotal',
    createdat: 'createdat',
    updatedat: 'updatedat',
    orderid: 'orderid',
    userid: 'userid',
};
// Constants column in table tokens
exports.CONST_COLUMN_TOKENS = {
    token: 'token',
    userid: 'userid',
    createdat: 'createdat'
};
