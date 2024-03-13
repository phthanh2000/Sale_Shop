
import { pool } from '../db/connection';
import { Entity_Users } from '../entities/entity_users';
import { CONST_TABLE_NAME, CONST_COLUMN_USERS } from '../constants';
import { Controller_Users } from '../controllers/controller_users';

export class Model_User {
  // Table name
  static tableName: string = CONST_TABLE_NAME.Users;

  // Function to get list user
  public static getUsers = async () => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // Data query
      let queryOptions = `SELECT * FROM ${Model_User.tableName} ORDER BY ${CONST_COLUMN_USERS.createdat}`;
      // Perform data queries
      const result = await client.query(queryOptions);
      return result.rows;
    } finally {
      // Release the connection
      client.release();
    }
  };

  // Function to create user
  public static createUser = async (user: Entity_Users) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // Data
      const { name, email, phone, pass, roleid } = user;
      // new Date
      const newDate = new Date().toISOString();
      // Data query
      const queryOptions = `INSERT INTO ${Model_User.tableName} 
                          (
                            ${CONST_COLUMN_USERS.name}, 
                            ${CONST_COLUMN_USERS.email},
                            ${CONST_COLUMN_USERS.phone}, 
                            ${CONST_COLUMN_USERS.pass},
                            ${CONST_COLUMN_USERS.createdat},
                            ${CONST_COLUMN_USERS.updatedat},
                            ${CONST_COLUMN_USERS.roleid}
                          ) VALUES ( '${name}', '${email}', ${phone}, '${pass}', '${newDate}', '${newDate}', ${roleid} ) RETURNING *`;
      // Perform data queries
      const result = await client.query(queryOptions);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  };

  // Function to update user
  public static updateUser = async (valueId: any, user: Entity_Users) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // New data
      const { name, email, phone, pass } = user;
      // User id
      const id = valueId;
      // new Date
      const newDate = new Date().toISOString();
      // Data query
      let queryOptions = `UPDATE ${Model_User.tableName} SET `;
      if (name !== undefined) {
        queryOptions += `${CONST_COLUMN_USERS.name}= '${name}', `
      }
      if (email !== undefined) {
        queryOptions += `${CONST_COLUMN_USERS.email}= '${email}', `
      }
      if (phone !== undefined) {
        queryOptions += `${CONST_COLUMN_USERS.phone}= ${phone}, `
      }
      if (pass !== undefined) {
        queryOptions += `${CONST_COLUMN_USERS.pass}= '${pass}', `
      }
      queryOptions += `${CONST_COLUMN_USERS.updatedat}= '${newDate}' WHERE ${CONST_COLUMN_USERS.id}= ${id} RETURNING *`;

      // Perform data queries
      const result = await client.query(queryOptions);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  };

  // Function to delete user
  public static deleteUser = async (valueId: any) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // User id
      const id = valueId;
      // Data query
      const queryOptions = `DELETE FROM ${Model_User.tableName}
                            WHERE ${CONST_COLUMN_USERS.id} = ${id} RETURNING *`;
      // Perform data queries
      const result = await client.query(queryOptions);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  };

  // Function check email exists
  public static checkEmailExists = async (user: Entity_Users) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // Email
      const { email } = user;
      // Data query
      const queryOptions = `SELECT *
                            FROM ${Model_User.tableName}
                            WHERE ${CONST_COLUMN_USERS.email} = '${email}'`
      // Perform data queries
      const result = await client.query(queryOptions);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  }
}