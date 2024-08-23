import { pool } from '../db/connection';
import { Entity_Roles } from '../entities/entity_roles';
import { CONST_TABLE_NAME, CONST_COLUMN_ROLES } from '../constants';

export class Model_Roles {
    // Table name
    static tableName: string = CONST_TABLE_NAME.Roles;

    // Function to get list role
  public static getRoles = async () => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // Data query
      let queryOptions = `SELECT * FROM ${Model_Roles.tableName}`;
      // Perform data queries
      const result = await client.query(queryOptions);
      return result.rows;
    } finally {
      // Release the connection
      client.release();
    }
  };
}