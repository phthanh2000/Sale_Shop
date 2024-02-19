import { Pool } from 'pg';
import { connectPostgres } from '../constants';

// Config for create new database
export const newPool = new Pool({
    user: connectPostgres.user,
    host: connectPostgres.host,
    password: connectPostgres.password,
    port: connectPostgres.port,
});
  
  // Config for connect present database
export const pool = new Pool({
    user: connectPostgres.user,
    host: connectPostgres.host,
    database: connectPostgres.database,
    password: connectPostgres.password,
    port: connectPostgres.port,
});