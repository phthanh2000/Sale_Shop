import * as path from 'path';
import { CONST_CONNECT_POSTGRES } from '../constants';
module.exports = {
    client: 'pg',
    connection: {
        host: CONST_CONNECT_POSTGRES.host,
        user: CONST_CONNECT_POSTGRES.user,
        password: CONST_CONNECT_POSTGRES.password,
        database: CONST_CONNECT_POSTGRES.database,
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