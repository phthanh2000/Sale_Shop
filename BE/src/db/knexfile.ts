import * as path from 'path';
import { connectPostgres } from '../constants';
module.exports = {
    client: 'pg',
    connection: {
        host: connectPostgres.host,
        user: connectPostgres.user,
        password: connectPostgres.password,
        database: connectPostgres.database
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: path.join(__dirname, 'src', 'migrations')
    }
};
