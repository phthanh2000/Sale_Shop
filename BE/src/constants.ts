// Constants postgres
export const CONST_CONNECT_POSTGRES = {
    user: 'postgres',
    host: 'localhost',
    database: 'sale_shop',
    password: '123456',
    port: 5432,
}

// Constants table name
export const CONST_TABLE_NAME = {
    Categories: `public."Categories"`,
    Products: `public."Products"`,
    Images: `public."Images`,
    Users: `public."Users"`,
    Orders: `public."Orders"`,
    OrderDetails: `public."OrderDetails"`,
    Tokens: `public."Tokens"`,
    Roles: `public."Roles"`
}

// Constants column in table categories
export const CONST_COLUMN_CATEGORIES = {
    id: 'id',
    name: 'name',
    code: 'code',
    createdat: 'createdat',
    updatedat: 'updatedat'
}

// Constants column in table products
export const CONST_COLUMN_PRODUCTS = {
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
}

// Constants column in table images
export const CONST_COLUMN_IMAGES = {
    id: 'id',
    url: 'url',
    createdat: 'createdat',
    updateddat: 'updatedat',
    productid: 'productid'
}

// Constants column in table roles
export const CONST_COLUMN_ROLES = {
    id: 'id',
    name: 'name',
    createdat: 'createdat',
    updatedat: 'updatedat'
}

// Constants column in table users
export const CONST_COLUMN_USERS = {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    pass: 'pass',
    createdat: 'createdat',
    updatedat: 'updatedat',
    roleid: 'roleid'
}

// Constants column in table orders
export const CONST_COLUMN_ORDERS = {
    id: 'id',
    totalamount: 'totalamount',
    status: 'status',
    createdat: 'createdat',
    userid: 'userid',
}

// Constants column in table order details
export const CONST_COLUMN_ORDER_DETAILS = {
    id: 'id',
    quantity: 'quantity',
    size: 'size',
    subtotal: 'subtotal',
    createdat: 'createdat',
    updatedat: 'updatedat',
    orderid: 'orderid',
    userid: 'userid',
}

// Constants column in table tokens
export const CONST_COLUMN_TOKENS = {
    token: 'token',
    userid: 'userid',
    createdat: 'createdat'
}