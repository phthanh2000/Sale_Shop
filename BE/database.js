const { Client }  = require('pg');

const signerOptions = {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "123456",
    database: "sale_shop"
}

const client = new Client({
    host: signerOptions.host,
    port: signerOptions.port,
    user: signerOptions.user,
    password: signerOptions.password,
    database: signerOptions.database
});

client.on("connect", () => {
    console.log("DB Connection");
});

client.on("end", () => {
    console.log("DB End");
});

module.exports = client;