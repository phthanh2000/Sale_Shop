
import { pool } from '../db/connection';
import { Entity_User, Column_User } from '../entities/entity_user';
import { CONST_TABLE_NAME } from '../constants';

export class Model_User {
  // Table name
  static tableName: string = CONST_TABLE_NAME.users;

  // Function to get list user
  public static getUsers = async () => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // Data query
      let queryOptions = `SELECT * FROM ${Model_User.tableName} ORDER BY ${Column_User.createdat}`;
      // Perform data queries
      const result = await client.query(queryOptions);
      return result.rows;
    } finally {
      // Release the connection
      client.release();
    }
  };

  // Function to create user
  public static createUser = async (user: Entity_User) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // Data
      const { name, email, pass } = user;
      // Data query
      const queryOptions = `INSERT INTO ${Model_User.tableName} 
                          (
                            ${Column_User.name}, 
                            ${Column_User.email}, 
                            ${Column_User.pass},
                            ${Column_User.createdat},
                            ${Column_User.updatedat}
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
  public static updateUser = async (valueId: string, user: Entity_User) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      // New data
      const { name, email, pass } = user;
      // User id
      const id = valueId;
      // Data query
      const queryOptions = `UPDATE ${Model_User.tableName}
                            SET ${Column_User.name}= $1, 
                                ${Column_User.email}= $2,
                                ${Column_User.pass}= $3,
                                ${Column_User.updatedat}= $4 
                            WHERE ${Column_User.id}= $5 RETURNING *`;
      // Perform data queries
      const result = await client.query(queryOptions, [name, email, pass, new Date(), id]);
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
                            WHERE ${Column_User.id} = $1 RETURNING *`;
      // Perform data queries
      const result = await client.query(queryOptions, [id]);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  };

  // Function to login
  public static getUserForNameAndPassword = async (user: Entity_User) => {
    // Connect postgres database
    const client = await pool.connect();
    try {
      const { name, pass } = user;
      const queryOptions = `SELECT * FROM ${Model_User.tableName} 
                            WHERE ${Column_User.name} = $1
                            AND ${Column_User.pass} = $2`;
      // Perform data queries
      const result = await client.query(queryOptions, [name, pass]);
      return result.rows[0];
    } finally {
      // Release the connection
      client.release();
    }
  };
}