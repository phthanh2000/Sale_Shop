import * as path from 'path';
import { connectPostgres } from '../constants';
module.exports = {
    client: 'pg',
    connection: {
        host: connectPostgres.host,
        user: connectPostgres.user,
        password: connectPostgres.password,
        database: connectPostgres.database,
        ssl: { rejectUnauthorized: false }
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: path.join(__dirname, 'src', 'migrations')
    }
};