"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.newPool = void 0;
const pg_1 = require("pg");
const constants_1 = require("../constants");
// Config for create new database
exports.newPool = new pg_1.Pool({
    user: constants_1.connectPostgres.user,
    host: constants_1.connectPostgres.host,
    password: constants_1.connectPostgres.password,
    port: constants_1.connectPostgres.port,
});
// Config for connect present database
exports.pool = new pg_1.Pool({
    user: constants_1.connectPostgres.user,
    host: constants_1.connectPostgres.host,
    database: constants_1.connectPostgres.database,
    password: constants_1.connectPostgres.password,
    port: constants_1.connectPostgres.port,
});
