
import { pool } from '../db/connection';
import { Entity_Users } from '../entities/entity_users';
import { CONST_TABLE_NAME, CONST_COLUMN_USERS } from '../constants';

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
      const { name, email, address, phone, pass, roleid } = user;
      // new Date
      const newDate = new Date().toISOString();
      // Data query
      const queryOptions = `INSERT INTO ${Model_User.tableName} 
                          (
                            ${CONST_COLUMN_USERS.name}, 
                            ${CONST_COLUMN_USERS.email},
                            ${CONST_COLUMN_USERS.address},
                            ${CONST_COLUMN_USERS.phone}, 
                            ${CONST_COLUMN_USERS.pass},
                            ${CONST_COLUMN_USERS.resetpass},
                            ${CONST_COLUMN_USERS.createdat},
                            ${CONST_COLUMN_USERS.updatedat},
                            ${CONST_COLUMN_USERS.roleid}
                          ) VALUES ( '${name}', '${email}','${address}', '${phone}', '${pass}', ${false}, '${newDate}', '${newDate}', ${roleid} ) RETURNING *`;
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
      const { name, email, address, phone, pass, resetpass, roleid } = user;
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
      if (address !== undefined) {
        queryOptions += `${CONST_COLUMN_USERS.address}= '${address}', `
      }
      if (phone !== undefined) {
        queryOptions += `${CONST_COLUMN_USERS.phone}= '${phone}', `
      }
      if (pass !== undefined) {
        queryOptions += `${CONST_COLUMN_USERS.pass}= '${pass}', `
      }
      if (resetpass !== undefined) {
        queryOptions += `${CONST_COLUMN_USERS.resetpass}= ${resetpass}, `
      }
      if (roleid !== undefined) {
        queryOptions += `${CONST_COLUMN_USERS.roleid} = ${roleid},`
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

  // Function to delete multiple users 
  public static deleteMultipleUsers = async (valueids: any) => {
    const client = await pool.connect();
    try {
      // List id of multiple users
      const ids = valueids;
      // Data query
      const queryOptions = `DELETE FROM ${Model_User.tableName}
                            WHERE ${CONST_COLUMN_USERS.id} IN (${ids}) RETURNING *`;
      // Perform data queries
      const result = await client.query(queryOptions);
      return result.rows;
    } finally {
      // Release the connection
      client.release();
    }
  }

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

  // Function check phone exists
  public static checkPhoneExists = async (user: Entity_Users) => {
    // Connect postgres database 
    const client = await pool.connect();
    try {
      // Phone
      const { phone } = user;
      // Data query
      const queryOptions = `SELECT *
                            FROM ${Model_User.tableName}
                            WHERE ${CONST_COLUMN_USERS.phone} = '${phone}'`
      // Perform data queries
      const result = await client.query(queryOptions);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  }

  // Function check user for id
  public static checkUserForId = async (id: any) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // Data query
      const queryOptions = `SELECT *
                            FROM ${Model_User.tableName}
                            WHERE ${CONST_COLUMN_USERS.id}= ${id}`
      // Perform data queries             
      const result = await client.query(queryOptions);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  }

  // Function check phone is registered with another user
  public static checkPhoneRegisteredWithAnotherUser = async (id: any, phone: number) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // Data query
      const queryOptions = `SELECT COUNT(*)
                            FROM ${CONST_TABLE_NAME.Users}
                            WHERE ${CONST_COLUMN_USERS.phone} = '${phone}' 
                            AND ${CONST_COLUMN_USERS.id} != ${id}`;
      // Perform data queries             
      const result = await client.query(queryOptions);
      return result.rows[0].count;
    } finally {
      // Release the connection
      client.release();
    }
  }

  // Function check email exists with another user
  public static checkEmailExistsWithAnthorUser = async (id: any, email: any) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // Data query
      const queryOptions = `SELECT COUNT(*)
                            FROM ${Model_User.tableName}
                            WHERE ${CONST_COLUMN_USERS.email} = '${email}'
                            AND ${CONST_COLUMN_USERS.id} != ${id}`;
      // Perform data queries
      const result = await client.query(queryOptions);
      return result.rows[0].count;
    } finally {
      // Release the connection
      client.release();
    }
  }
}