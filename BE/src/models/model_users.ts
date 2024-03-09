
import { pool } from '../db/connection';
import { Entity_Users } from '../entities/entity_users';
import { CONST_TABLE_NAME, CONST_COLUMN_USERS } from '../constants';

export class Model_User {
  // Table name
  static tableName: string = CONST_TABLE_NAME.users;

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
      const { name, email, pass } = user;
      // Data query
      const queryOptions = `INSERT INTO ${Model_User.tableName} 
                          (
                            ${CONST_COLUMN_USERS.name}, 
                            ${CONST_COLUMN_USERS.email}, 
                            ${CONST_COLUMN_USERS.pass},
                            ${CONST_COLUMN_USERS.createdat},
                            ${CONST_COLUMN_USERS.updatedat}
                          ) VALUES ( $1, $2, $3, $4, $5 ) RETURNING *`;
      // Perform data queries
      const result = await client.query(queryOptions, [name, email, pass, new Date(), new Date]);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  };

  // Function to update user
  public static updateUser = async (valueId: string, user: Entity_Users) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // New data
      const { name, email, phone, pass } = user;
      // User id
      const id = valueId;
      // Data query
      const queryOptions = `UPDATE ${Model_User.tableName}
                            SET ${CONST_COLUMN_USERS.name}= $1, 
                                ${CONST_COLUMN_USERS.email}= $2,
                                ${CONST_COLUMN_USERS.phone}= $3,
                                ${CONST_COLUMN_USERS.pass}= $4,
                                ${CONST_COLUMN_USERS.updatedat}= $5
                            WHERE ${CONST_COLUMN_USERS.id}= $6 RETURNING *`;
      // Perform data queries
      const result = await client.query(queryOptions, [name, email, phone, pass, new Date(), id]);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  };

  // Function to delete user
  public static deleteUser = async (valueId: string) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // User id
      const id = valueId;
      // Data query
      const queryOptions = `DELETE FROM ${Model_User.tableName}
                            WHERE ${CONST_COLUMN_USERS.id} = $1 RETURNING *`;
      // Perform data queries
      const result = await client.query(queryOptions, [id]);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  };

  // Function check user is exists in list 
  public static checkUserIsExists = async (user: Entity_Users) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      const { email } = user;
      const queryOptions = `SELECT *
                            FROM ${Model_User.tableName}
                            WHERE ${CONST_COLUMN_USERS.email} = $1`
      // Perform data queries
      const result = await client.query(queryOptions, [email]);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  }

  // Function to get user for email and password
  public static getUserForEmailAndPassword = async (user: Entity_Users) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      const { email, pass } = user;
      const queryOptions = `SELECT * FROM ${Model_User.tableName} 
                            WHERE ${CONST_COLUMN_USERS.email} = $1
                            AND ${CONST_COLUMN_USERS.pass} = $2`;
      // Perform data queries
      const result = await client.query(queryOptions, [email, pass]);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  };
}