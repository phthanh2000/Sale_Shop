import { Pool } from 'pg';
import { CONST_CONNECT_POSTGRES } from '../constants';

// Config for create new database
export const newPool = new Pool({
  user: CONST_CONNECT_POSTGRES.user,
  host: CONST_CONNECT_POSTGRES.host,
  password: CONST_CONNECT_POSTGRES.password,
  port: CONST_CONNECT_POSTGRES.port,
});

// Config for connect present database
export const pool = new Pool({
  user: CONST_CONNECT_POSTGRES.user,
  host: CONST_CONNECT_POSTGRES.host,
  database: CONST_CONNECT_POSTGRES.database,
  password: CONST_CONNECT_POSTGRES.password,
  port: CONST_CONNECT_POSTGRES.port,
});