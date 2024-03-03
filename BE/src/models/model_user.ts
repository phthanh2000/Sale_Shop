
import { pool } from '../db/connection';
import { Entity_User, Column_User } from '../entities/entity_user';
import { CONST_TABLE_NAME } from '../constants';

export class Model_User {
  static tableName : string = CONST_TABLE_NAME.users;

  public static getUsers = async () => {
    const client = await pool.connect();
    try {
      let queryOptions = `SELECT * FROM ${Model_User.tableName} ORDER BY ${Column_User.id}`;
      const result = await client.query(queryOptions);
      return result.rows;
    } finally {
      client.release();
    }
  };

  public static createUser = async (user: Entity_User) => {
    const client = await pool.connect();
    try {
      const { name , email, pass } = user;
      const queryOptions = `INSERT INTO ${Model_User.tableName} 
                          (
                            ${Column_User.name}, 
                            ${Column_User.email}, 
                            ${Column_User.pass},
                            ${Column_User.createdAt},
                            ${Column_User.updatedAt}
                          ) VALUES ( $1, $2, $3, $4, $5 ) RETURNING *`;
      const result = await client.query(queryOptions,[name, email, pass, new Date(), new Date]);
      return result.rows[0];
    } finally {
      client.release();
    }
  };

  public static updateUser = async (user: Entity_User) => {
    const client = await pool.connect();
    try {
      const { name , email, pass } = user;
      const queryOptions = `UPDATE ${Model_User.tableName}
                            SET ${Column_User.name}= $1, 
                                ${Column_User.email}= $2,
                                ${Column_User.pass}= $3,
                                ${Column_User.updatedAt}= $4 
                            WHERE ${Column_User.email}= $5 RETURNING *`;
      const result = await client.query(queryOptions, [name ,email, pass, ,new Date(), email]);
      return result.rows[0];
    } finally {
      client.release();
    }
  };

  public static deleteUser = async (id: string) => {
    const client = await pool.connect();
    try {
      const queryOptions = `DELETE FROM ${Model_User.tableName}
                            WHERE ${Column_User.id} = $1 RETURNING *`;
      const result = await client.query(queryOptions, [id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  };
}